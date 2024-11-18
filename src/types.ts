import type { WSResponseErrorCode } from "./error";
import type {
  BaseButtonComponent,
  BodyComponent,
  HeaderComponent,
} from "./templateMessages/components";

export interface SetUpProps {
  businessPhoneNumberId: string;
  graphApiToken: string;
}

export interface TextMessageBody {
  messaging_product: "whatsapp";
  to: string;
  text: {
    body: string;
    preview_url?: true;
  };
  context?: {
    message_id: string;
  };
}

export interface ContactInfo {
  input: string;
  wa_id: string;
}

export interface MessageInfo {
  id: string;
  message_status?: string;
}

export interface TextMessageResponse {
  messaging_product: "whatsapp";
  contacts: ContactInfo[];
  messages: MessageInfo[];
}

export interface WSErrorJSON {
  message: string;
  type: string;
  code: WSResponseErrorCode;
  error_data: {
    messaging_product: "whatsapp";
    details: string;
  };
  error_subcode?: number;
  fbtrace_id: string;
}

export interface WSErrorResponse {
  error: WSErrorJSON;
}

export interface SendTextMessageProps {
  /**Número de celular de la persona a la que se le quiere enviar el mensaje */
  phoneNumber: string;
  /**Mensaje de texto, puede tener un máximo de 4096 carácteres */
  message: string;
  /**Añadir si se quiere que el mensaje sea una respuesta de otro */
  messageId?: string;
  /**Asignar a true si se quiere mostrar una previsualización de link en el mensaje */
  previewUrl?: true;
}

export interface SendTemplateMessageProps {
  name: string;
  /**
   * [Supported language codes](https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages)
   */
  languageCode: string;
  /**Número de celular de la persona a la que se le quiere enviar el mensaje */
  phoneNumber: string;
  headerComponent?: HeaderComponent;
  bodyComponent?: BodyComponent;
  buttonComponents?: BaseButtonComponent[];
}

export interface TemplateMessageBody {
  type: "template";
  messaging_product: "whatsapp";
  to: string;
  template: {
    name: string;
    language: {
      code: string;
    };
    components?: object[];
  };
}
