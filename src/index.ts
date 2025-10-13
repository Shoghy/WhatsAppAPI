import { catchUnwindAsync } from "rusting-js";
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
import type { Result } from "rusting-js/enums";
import { Err, Ok } from "rusting-js/enums";
import { WSRequestError, WSError } from "./error";

class WhatsAppApi {
  private headers: HeadersInit;
  private baseUrl: string;

  constructor(graphApiToken: string, businessPhoneNumberId: string) {
    this.headers = {
      Authorization: `Bearer ${graphApiToken}`,
      "Content-Type": "application/json",
    };
    this.baseUrl = `https://graph.facebook.com/v22.0/${businessPhoneNumberId}`;
  }

  /**
   * @link https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages
   */
  async SendTextMessage({
    phoneNumber,
    message,
    messageId,
    previewUrl = false,
  }: SendTextMessageProps): Promise<
    Result<TextMessageResponse, WSRequestError>
  > {
    const { headers, baseUrl } = this;

    const body: TextMessageBody = {
      messaging_product: "whatsapp",
      text: { body: message },
      to: phoneNumber,
    };

    if (messageId !== undefined) {
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
  }: SendTemplateMessageProps): Promise<
    Result<TextMessageResponse, WSRequestError>
  > {
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

    if (headerComponent !== undefined) {
      components.push(headerComponent.ToJSON());
    }
    if (bodyComponent !== undefined) {
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
    if (result.isErr()) {
      return Err(WSRequestError.FetchError(result.unwrapErr()));
    }

    const response = result.unwrap();
    const jsonResult = await catchUnwindAsync(() => response.json());
    if (jsonResult.isErr()) {
      return Err(WSRequestError.ParseError(jsonResult.unwrapErr()));
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

export function SetUpWhatsAppAPI({
  graphApiToken,
  businessPhoneNumberId,
}: SetUpProps): WhatsAppApi {
  return new WhatsAppApi(graphApiToken, businessPhoneNumberId);
}
