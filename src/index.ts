import { catch_unwind, panic } from "rusting-js";
import { SafeFetch } from "./safeFetch";
import type {
  SendTextProps,
  SetUpProps,
  TextMessageBody,
  TextMessageResponse,
  WSErrorResponse,
} from "./types";
import { Err, Ok, Result } from "rusting-js/enums";
import { WSRequestError } from "./error";

class WhatsAppApi {
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
  }: SendTextProps): Promise<Result<TextMessageResponse, WSRequestError>> {
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
      return Err(WSRequestError.ResponseError(responseJson.error));
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
