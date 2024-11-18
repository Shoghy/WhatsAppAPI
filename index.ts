export { SetUpWhatsAppAPI, WhatsApp, WhatsAppApi } from "./src/index";
export type {
  ContactInfo,
  MessageInfo,
  WSErrorJSON,
  WSErrorResponse,
  TextMessageResponse,
  SendTemplateMessageProps,
  SendTextMessageProps,
  SetUpProps,
  TemplateMessageBody,
  TextMessageBody,
} from "./src/types";
export { WSRequestError, WSResponseErrorCode, WSError } from "./src/error";
export {
  BodyComponent,
  ButtonComponentType,
  CatalogButtonComponent,
  ComponentType,
  HeaderComponent,
  QuickReplyButtonComponent,
  UrlButtonComponent,
  BaseButtonComponent,
} from "./src/templateMessages/components";
export {
  ButtonParamType,
  ButtonPayloadParam,
  ButtonTextParam,
  CurrencyParam,
  DateTimeParam,
  DocumentParam,
  ImageParam,
  TextParam,
  VideoParam,
  ParamType,
  BaseButtonParam,
  BaseParam,
  type CurrencyParamProps,
  type DocumentParamProps,
} from "./src/templateMessages/params";
