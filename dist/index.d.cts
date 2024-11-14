import { Result } from 'rusting-js/enums';

/**
 * @link https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes
 */
declare enum WSResponseErrorCode {
    /**
     * Typically this means the included access token has expired,
     * been invalidated, or the app user has changed a setting to prevent
     * all apps from accessing their data. We recommend that you get a new access token.
     */
    AuthException = 0,
    /**Capability or permissions issue. */
    APIMethod = 3,
    /**
     * Permission is either not granted or has been removed.
     */
    PermissionDenied = 10,
    AccessTokenHasExpired = 190,
    /**
     * Any number between 200 and 299 (inclusive) is an `APIPermission` error
     */
    APIPermission1 = 200,
    /**
     * Any number between 200 and 299 (inclusive) is an `APIPermission` error
     */
    APIPermission100 = 299,
    /**The app has reached its API call rate limit. */
    APITooManyCalls = 4,
    /**The WhatsApp Business Account has reached its rate limit. */
    RateLimitIssues = 80007,
    /**Cloud API message throughput has been reached */
    RateLimitHit = 130429,
    /**
     * Message failed to send because there are restrictions on how many
     * messages can be sent from this phone number.
     * This may be because too many previous messages were blocked or flagged as spam.
     */
    SpamRateLimitHit = 131048,
    /**
     * Too many messages sent from the sender phone number to the same
     * recipient phone number in a short period of time.
     */
    PairRateLimitHit = 131056,
    /**
     * Registration or Deregistration failed because there were too many attempts
     * for this phone number in a short period of time
     */
    AccountRegisterDeregisterRateLimitExceeded = 133016,
    /**
     * The WhatsApp Business Account associated with the app has been restricted
     * or disabled for violating a platform policy.
     */
    TemporarilyBlockedForPoliciesViolations = 368,
    /**
     * The WhatsApp Business Account is restricted from messaging to users in certain countries.
     */
    BusinessAccountIsRestrictedFromMessagingUsersInThisCountry = 130497,
    /**
     * The WhatsApp Business Account associated with the app has been
     * restricted or disabled for violating a platform policy, or we
     * were unable to verify data included in the request against data
     * set on the WhatsApp Business Account (e.g, the two-step pin included
     * in the request is incorrect).
     */
    AccountHasBeenLocked = 131031,
    /**Invalid request or possible server error. */
    APIUnknown = 1,
    /**Temporary due to downtime or due to being overloaded */
    APIService = 2,
    /**The business phone number has been deleted */
    PhoneNumberIsNotValid = 33,
    /**The request included one or more unsupported or misspelled parameters. */
    InvalidParameter = 100,
    /**Message was not sent as part of an [experiment](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/experiments). */
    UserNumberIsPartOfAnExperiment = 130472,
    /**
     * Message failed to send due to an unknown error.
     *
     * When setting a business public key, it either failed to calculate
     * the signature, call the GraphQL endpoint, or the GraphQL endpoint returned an error.
     */
    SomethingWentWrong = 131000,
    /**Permission is either not granted or has been removed. */
    AccessDenied = 131005,
    /**The request is missing a required parameter. */
    RequiredParameterIsMissing = 131008,
    /**One or more parameter values are invalid. */
    ParameterValueIsNotValid = 131009,
    /**A service is temporarily unavailable. */
    ServiceUnavailable = 131016,
    /**Sender and recipient phone number is the same. */
    RecipientCannotBeSender = 131021,
    /**
     * Unable to deliver message. Reasons can include:
     * * The recipient phone number is not a WhatsApp phone number.
     * * Sending an authentication template to a WhatsApp user who has a +91 country calling code (India). Authentication templates currently cannot be sent to WhatsApp users in India.
     * * Recipient has not accepted our new Terms of Service and Privacy Policy.
     * * Recipient using an old WhatsApp version; must use the following WhatsApp version or greater:
     *   * Android: 2.21.15.15
     *   * SMBA: 2.21.15.15
     *   * iOS: 2.21.170.4
     *   * SMBI: 2.21.170.4
     *   * KaiOS: 2.2130.10
     *   * Web: 2.2132.6
     */
    MessageUndeliverable = 131026,
    /**There was an error related to your payment method. */
    BusinessEligibilityPaymentIssue = 131042,
    /**Message failed to send due to a phone number registration error. */
    IncorrectCertificate = 131045,
    /**More than 24 hours have passed since the recipient last replied to the sender number. */
    ReEngagementMessage = 131047,
    /**This message was not delivered to maintain healthy ecosystem engagement. */
    MetaChoseNotToDeliver = 131097,
    UnsupportedMessageType = 131051,
    /**Unable to download the media sent by the user. */
    MediaDownloadError = 131052,
    /**Unable to upload the media used in the message. */
    MediaUploadError = 131053,
    /**Buiness Account is in maintenance mode */
    AccountInMaintenanceMode = 131057,
    /**
     * The number of variable parameter values included in the request
     * did not match the number of variable parameters defined in the template.
     */
    TemplateParamCountMismatch = 132000,
    /**
     * The template does not exist in the specified language or the template has not been approved.
     */
    TemplateDoesNotExist = 132001,
    /**Translated text is too long. */
    TemplateHydratedTextTooLong = 132005,
    /**Template content violates a WhatsApp policy. */
    TemplateFormatCharacterPolicyViolated = 13007,
    /**Variable parameter values formatted incorrectly. */
    TemplateParameterFormatMismatch = 132012,
    /**Template is paused due to low quality so it cannot be sent in a template message. */
    TemplateIsPaused = 132015,
    /**Template has been paused too many times due to low quality and is now permanently disabled. */
    TemplateIsDisabled = 132016,
    /**Flow is in blocked state. */
    FlowIsBlocked = 132068,
    /**Flow is in throttled state and 10 messages using this flow were already sent in the last hour. */
    FlowIsThrottled = 132069,
    /**A previous deregistration attempt failed. */
    IncompleteDeregistration = 13000,
    TwoStepVerificationPinMismatch = 133005,
    /**Phone number needs to be verified before registering. */
    PhoneNumberReVerificationNeeded = 133006,
    /**Too many two-step verification PIN guesses for this phone number. */
    TooManyTwoStepVerificationPinGuesses = 133008,
    /**Two-step verification PIN was entered too quickly. */
    TwoStepVerificationPinGuessedTooFast = 13009,
    PhoneNumberNotRegistered = 133010,
    /**The phone number you are attempting to register was recently deleted, and deletion has not yet completed. */
    PleaseWaitAFewMinutesBeforeAttemptingToRegisterThisPhoneNumber = 133015,
    /**Message failed to send because of an unknown error with your request parameters. */
    GenericUserError = 135000
}
declare const WSRequestError_base: {
    new (type: "FetchError" | "ParseError" | "ResponseError", value: Error | WSErrorJSON): {
        update(sym: symbol, type: "FetchError" | "ParseError" | "ResponseError", value: unknown): void;
        get(sym: symbol): any;
        change_to<T extends "FetchError" | "ParseError" | "ResponseError">(type: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T] extends void ? T : never): void;
        change_to<T extends "FetchError" | "ParseError" | "ResponseError">(type: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T] extends void ? never : T, value: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T]): void;
        is(type: "FetchError" | "ParseError" | "ResponseError"): boolean;
        if_is<T extends "FetchError" | "ParseError" | "ResponseError">(type: T, func: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T] extends void ? () => unknown : (value: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T]) => unknown): void;
        match<T>(arms: {
            FetchError: (value: Error) => T;
            ParseError: (value: Error) => T;
            ResponseError: (value: WSErrorJSON) => T;
        }): T;
        match<T>(arms: {
            FetchError?: ((value: Error) => T) | undefined;
            ParseError?: ((value: Error) => T) | undefined;
            ResponseError?: ((value: WSErrorJSON) => T) | undefined;
        }, def: () => T): T;
        toString(): string;
    };
    create<T extends "FetchError" | "ParseError" | "ResponseError">(type: {
        FetchError: Error;
        ParseError: Error;
        ResponseError: WSErrorJSON;
    }[T] extends void ? T : never): {
        update(sym: symbol, type: "FetchError" | "ParseError" | "ResponseError", value: unknown): void;
        get(sym: symbol): any;
        change_to<T_1 extends "FetchError" | "ParseError" | "ResponseError">(type: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1] extends void ? T_1 : never): void;
        change_to<T_1 extends "FetchError" | "ParseError" | "ResponseError">(type: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1] extends void ? never : T_1, value: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1]): void;
        is(type: "FetchError" | "ParseError" | "ResponseError"): boolean;
        if_is<T_1 extends "FetchError" | "ParseError" | "ResponseError">(type: T_1, func: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1] extends void ? () => unknown : (value: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1]) => unknown): void;
        match<T_1>(arms: {
            FetchError: (value: Error) => T_1;
            ParseError: (value: Error) => T_1;
            ResponseError: (value: WSErrorJSON) => T_1;
        }): T_1;
        match<T_1>(arms: {
            FetchError?: ((value: Error) => T_1) | undefined;
            ParseError?: ((value: Error) => T_1) | undefined;
            ResponseError?: ((value: WSErrorJSON) => T_1) | undefined;
        }, def: () => T_1): T_1;
        toString(): string;
    };
    create<T extends "FetchError" | "ParseError" | "ResponseError">(type: {
        FetchError: Error;
        ParseError: Error;
        ResponseError: WSErrorJSON;
    }[T] extends void ? never : T, value: {
        FetchError: Error;
        ParseError: Error;
        ResponseError: WSErrorJSON;
    }[T]): {
        update(sym: symbol, type: "FetchError" | "ParseError" | "ResponseError", value: unknown): void;
        get(sym: symbol): any;
        change_to<T_1 extends "FetchError" | "ParseError" | "ResponseError">(type: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1] extends void ? T_1 : never): void;
        change_to<T_1 extends "FetchError" | "ParseError" | "ResponseError">(type: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1] extends void ? never : T_1, value: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1]): void;
        is(type: "FetchError" | "ParseError" | "ResponseError"): boolean;
        if_is<T_1 extends "FetchError" | "ParseError" | "ResponseError">(type: T_1, func: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1] extends void ? () => unknown : (value: {
            FetchError: Error;
            ParseError: Error;
            ResponseError: WSErrorJSON;
        }[T_1]) => unknown): void;
        match<T_1>(arms: {
            FetchError: (value: Error) => T_1;
            ParseError: (value: Error) => T_1;
            ResponseError: (value: WSErrorJSON) => T_1;
        }): T_1;
        match<T_1>(arms: {
            FetchError?: ((value: Error) => T_1) | undefined;
            ParseError?: ((value: Error) => T_1) | undefined;
            ResponseError?: ((value: WSErrorJSON) => T_1) | undefined;
        }, def: () => T_1): T_1;
        toString(): string;
    };
};
declare class WSRequestError extends WSRequestError_base {
    static FetchError(error: Error): WSRequestError;
    static ParseError(error: Error): WSRequestError;
    static ResponseError(error: WSErrorJSON): WSRequestError;
}

declare enum ParamType {
    Currency = "currency",
    DateTime = "date_time",
    Document = "document",
    Image = "image",
    Text = "text",
    Video = "video"
}
declare abstract class BaseParam {
    readonly type: ParamType;
    constructor(type: ParamType);
    ToJSON(): object;
}
interface CurrencyParamProps {
    /**Default text if localization fails. */
    fallbackValue: string;
    /**Currency code as defined in ISO 4217. */
    code: string;
    /**Amount multiplied by 1000. */
    amount1000: number;
}
declare class CurrencyParam extends BaseParam implements CurrencyParamProps {
    fallbackValue: string;
    code: string;
    amount1000: number;
    constructor({ fallbackValue, code, amount1000 }: CurrencyParamProps);
    ToJSON(): object;
}
declare class DateTimeParam extends BaseParam {
    fallbackValue: string;
    /**
     * @param fallbackValue Default text. For Cloud API, we always use the fallback value,
     * and we do not attempt to localize using other optional fields.
     */
    constructor(fallbackValue: string);
    ToJSON(): object;
}
type MediaParamType = ParamType.Image | ParamType.Video | ParamType.Document;
declare abstract class MediaParam extends BaseParam {
    caption?: string;
    link: string;
    id: string;
    protected constructor(type: MediaParamType, caption?: string);
    ToJSON(): object;
}
interface DocumentParamProps {
    caption?: string;
    /**The extension of the filename will specify what format the document is displayed as in WhatsApp. */
    filename?: string;
}
declare class DocumentParam extends MediaParam {
    filename?: string;
    private constructor();
    static FromId(id: string, props?: DocumentParamProps): DocumentParam;
    static FromLink(link: string, props?: DocumentParamProps): DocumentParam;
    ToJSON(): object;
}
declare class ImageParam extends MediaParam {
    static FromId(id: string, caption?: string): ImageParam;
    static FromLink(link: string, caption?: string): ImageParam;
}
declare class TextParam extends BaseParam {
    text: string;
    constructor(text: string);
    ToJSON(): object;
}
declare class VideoParam extends MediaParam {
    static FromId(id: string, caption?: string): VideoParam;
    static FromLink(link: string, caption?: string): VideoParam;
}
declare enum ButtonParamType {
    Payload = "payload",
    Text = "text"
}
declare abstract class BaseButtonParam {
    readonly type: ButtonParamType;
    constructor(type: ButtonParamType);
    ToJSON(): object;
}
declare class ButtonPayloadParam extends BaseButtonParam {
    payload: string;
    constructor(payload: string);
    ToJSON(): object;
}
declare class ButtonTextParam extends BaseButtonParam {
    text: string;
    constructor(text: string);
    ToJSON(): object;
}

declare enum ComponentType {
    Body = "body",
    Header = "header",
    Button = "button"
}
declare abstract class Component {
    readonly type: ComponentType;
    constructor(type: ComponentType);
    ToJSON(): object;
}
type ParamBaseComponentType = ComponentType.Body | ComponentType.Header;
declare abstract class ParamBaseComponent extends Component {
    parameters: Array<BaseParam>;
    constructor(type: ParamBaseComponentType, parameters: Array<BaseParam>);
    ToJSON(): object;
}
declare class BodyComponent extends ParamBaseComponent {
    constructor(parameters: Array<BaseParam>);
}
declare class HeaderComponent extends ParamBaseComponent {
    constructor(parameters: Array<BaseParam>);
}
declare enum ButtonComponentType {
    /**
     * Refers to a previously created quick reply button
     * that allows for the customer to return a predefined message.
     */
    QuickReply = "quick_reply",
    /**
     * Refers to a previously created button that allows the customer
     * to visit the URL generated by appending the text parameter to the
     * predefined prefix URL in the template.
     */
    Url = "url",
    /**
     * Refers to a previously created catalog button that allows for the
     * customer to return a full product catalog.
     */
    Catalog = "catalog"
}
declare abstract class BaseButtonComponent extends Component {
    readonly subType: ButtonComponentType;
    index: number;
    /**
     * @param index Position index of the button. You can have up to 10 buttons using index values of 0 to 9.
     */
    constructor(subType: ButtonComponentType, index: number);
    ToJSON(): object;
}
declare class QuickReplyButtonComponent extends BaseButtonComponent {
    payload: string;
    constructor(payload: string, index: number);
    ToJSON(): object;
}
declare class UrlButtonComponent extends BaseButtonComponent {
    text: string;
    constructor(text: string, index: number);
    ToJSON(): object;
}
declare class CatalogButtonComponent extends BaseButtonComponent {
    param: BaseButtonParam;
    constructor(param: BaseButtonParam, index: number);
    ToJSON(): object;
}

interface SetUpProps {
    businessPhoneNumberId: string;
    graphApiToken: string;
}
interface ContactInfo {
    input: string;
    wa_id: string;
}
interface MessageInfo {
    id: string;
    message_status?: string;
}
interface TextMessageResponse {
    messaging_product: "whatsapp";
    contacts: ContactInfo[];
    messages: MessageInfo[];
}
interface WSErrorJSON {
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
interface SendTextMessageProps {
    /**Número de celular de la persona a la que se le quiere enviar el mensaje */
    phoneNumber: string;
    /**Mensaje de texto, puede tener un máximo de 4096 carácteres */
    message: string;
    /**Añadir si se quiere que el mensaje sea una respuesta de otro */
    messageId?: string;
    /**Asignar a true si se quiere mostrar una previsualización de link en el mensaje */
    previewUrl?: true;
}
interface SendTemplateMessageProps {
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

declare class WhatsAppApi {
    private headers;
    private baseUrl;
    constructor(graphApiToken: string, businessPhoneNumberId: string);
    /**
     * @link https://developers.facebook.com/docs/whatsapp/cloud-api/messages/text-messages
     */
    SendTextMessage({ phoneNumber, message, messageId, previewUrl, }: SendTextMessageProps): Promise<Result<TextMessageResponse, WSRequestError>>;
    /**
     * @link https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-message-templates
     */
    SendTemplateMessage({ languageCode, name, phoneNumber, headerComponent, bodyComponent, buttonComponents, }: SendTemplateMessageProps): Promise<Result<TextMessageResponse, WSRequestError>>;
    protected HandleResponse(result: Result<Response, Error>): Promise<Result<TextMessageResponse, WSRequestError>>;
}
declare function WhatsApp(): WhatsAppApi;
declare function SetUpWhatsAppAPI({ graphApiToken, businessPhoneNumberId, }: SetUpProps): WhatsAppApi;

export { BodyComponent, ButtonComponentType, ButtonParamType, ButtonPayloadParam, ButtonTextParam, CatalogButtonComponent, ComponentType, CurrencyParam, DateTimeParam, DocumentParam, HeaderComponent, ImageParam, ParamType, QuickReplyButtonComponent, SetUpWhatsAppAPI, TextParam, UrlButtonComponent, VideoParam, WSRequestError, WSResponseErrorCode, WhatsApp };
