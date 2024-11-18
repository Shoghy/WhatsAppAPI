import { catch_unwind, panic } from "rusting-js";
import { SafeFetch } from "./safeFetch";
import type {
  SendTemplateMessageProps,
  SendTextMessageProps,
  SetUpProps,
  TemplateMessageBody,
  TextMessageBody,
  TextMessageResponse,
  WSErrorResponse,
} from "./types";
import { Err, Ok, Result } from "rusting-js/enums";
import { WSRequestError, WSError } from "./error";

export class WhatsAppApi {
  private headers: HeadersInit;
  private baseUrl: string;

  constructor(graphApiToken: string, businessPhoneNumberId: string) {
    this.headers = {
      Authorization: `Bearer ${graphApiToken}`,
      "Content-Type": "application/json",
    };
    this.baseUrl = `https://graph.facebook.com/v20.0/${businessPhoneNumberId}`;
  }

  /**
   * @link https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages
   */
  async SendTextMessage({
    phoneNumber,
    message,
    messageId,
    previewUrl,
  }: SendTextMessageProps) {
    const { headers, baseUrl } = this;

    const body: TextMessageBody = {
      messaging_product: "whatsapp",
      text: { body: message },
      to: phoneNumber,
    };

    if (messageId) {
      body.context = { message_id: messageId };
    }
    if (previewUrl) {
      body.text.preview_url = true;
    }

    const result = await SafeFetch(`${baseUrl}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    return await this.HandleResponse(result);
  }

  /**
   * @link https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates
   */
  async SendTemplateMessage({
    languageCode,
    name,
    phoneNumber,
    headerComponent,
    bodyComponent,
    buttonComponents = [],
  }: SendTemplateMessageProps) {
    const { headers, baseUrl } = this;

    const body: TemplateMessageBody = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name,
        language: { code: languageCode },
      },
    };
    const components: object[] = [];

    if (headerComponent) {
      components.push(headerComponent.ToJSON());
    }
    if (bodyComponent) {
      components.push(bodyComponent.ToJSON());
    }
    for (const button of buttonComponents) {
      components.push(button.ToJSON());
    }
    if (components.length > 0) {
      body.template.components = components;
    }

    const result = await SafeFetch(`${baseUrl}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    return await this.HandleResponse(result);
  }

  protected async HandleResponse(
    result: Result<Response, Error>,
  ): Promise<Result<TextMessageResponse, WSRequestError>> {
    if (result.is_err()) {
      return Err(WSRequestError.FetchError(result.unwrap_err()));
    }

    const response = result.unwrap();
    const jsonResult = await catch_unwind(() => response.json());
    if (jsonResult.is_err()) {
      return Err(WSRequestError.ParseError(jsonResult.unwrap_err()));
    }

    const responseJson: TextMessageResponse | WSErrorResponse =
      jsonResult.unwrap();
    if ("error" in responseJson) {
      return Err(
        WSRequestError.ResponseError(WSError.FromJSON(responseJson.error)),
      );
    }

    return Ok(responseJson);
  }
}

const key = "WHATSAPP_APP_KEY";
const app = new Map<string, WhatsAppApi>();

export function WhatsApp() {
  const api = app.get(key);
  if (api === undefined) {
    panic("The API hasn't been initialized");
  }
  return api;
}

export function SetUpWhatsAppAPI({
  graphApiToken,
  businessPhoneNumberId,
}: SetUpProps) {
  const api = new WhatsAppApi(graphApiToken, businessPhoneNumberId);
  app.set(key, api);
  return api;
}
