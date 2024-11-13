import { Enum } from "rusting-js/enums";
import type { WSErrorJSON } from "./types";

/**
 * @link https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes
 */
export enum WSResponseErrorCode {
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
  GenericUserError = 135000,
}

export class WSRequestError extends Enum<{
  FetchError: Error;
  ParseError: Error;
  ResponseError: WSErrorJSON;
}>() {
  static FetchError(error: Error): WSRequestError {
    return this.create("FetchError", error);
  }

  static ParseError(error: Error): WSRequestError {
    return this.create("ParseError", error);
  }

  static ResponseError(error: WSErrorJSON): WSRequestError {
    return this.create("ResponseError", error);
  }
}
