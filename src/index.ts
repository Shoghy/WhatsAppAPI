import type { SetUpProps, TextMessageBody } from "./types";

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
   * @param phoneNumber Número de celular de la persona a la que se le quiere enviar el mensaje
   * @param message Mensaje de texto
   * @param messageId Añadir si se quiere que el mensaje sea una respuesta de otro
   */
  SendText(phoneNumber: string, message: string, messageId?: string) {
    const { headers, baseUrl } = this;

    const body: TextMessageBody = {
      messaging_product: "whatsapp",
      text: { body: message },
      to: phoneNumber,
    };

    if (messageId) {
      body.context = { message_id: messageId };
    }

    fetch(`${baseUrl}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  }
}

const key = "WHATSAPP_APP_KEY";
const app = new Map<string, WhatsAppApi>();

export function WhatsApp() {
  const api = app.get(key);
  if (api === undefined) {
    throw new Error("The API hasn't been initialized");
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
