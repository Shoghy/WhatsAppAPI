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
