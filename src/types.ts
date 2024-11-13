import type { WSResponseErrorCode } from "./error";

export interface SetUpProps {
  businessPhoneNumberId: string;
  graphApiToken: string;
}

export interface TextMessageBody {
  messaging_product: "whatsapp";
  to: string;
  text: { body: string };
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
  message_status: string;
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
  error_subcode: number;
  fbtrace_id: string;
}

export interface WSErrorResponse {
  error: WSErrorJSON;
}
