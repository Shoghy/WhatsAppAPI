import { SetUpWhatsAppAPI } from "./src";
import { WSResponseErrorCode } from "./src/error";
import {
  BodyComponent,
  UrlButtonComponent,
} from "./src/templateMessages/components";
import { TextParam } from "./src/templateMessages/params";

const WhatsApp = SetUpWhatsAppAPI({
  businessPhoneNumberId: "<your business phone number id>",
  graphApiToken: "<your graph api token>",
});

(async () => {
  const response = await WhatsApp.SendTemplateMessage({
    languageCode: "en_US",
    name: "verification_code",
    phoneNumber: "<your phone number... or someone else's>",
    bodyComponent: new BodyComponent([new TextParam("123456")]),
    buttonComponents: [new UrlButtonComponent("123456", 0)],
  });

  response.match({
    Ok(okResponse) {
      console.log("The message template was sent successfully");
      console.log("Response:\n", JSON.stringify(okResponse, undefined, 2));
    },
    Err(error) {
      error.match({
        FetchError(value) {
          console.log("An error occurred while communicating with Meta", value);
        },
        ParseError(value) {
          console.log("The response sent by Meta was not a valid JSON", value);
        },
        ResponseError(value) {
          console.log("Meta sent an error response", value);
          switch (value.code) {
            case WSResponseErrorCode.MetaChoseNotToDeliver:
              console.log("Meta didn't like your message");
              break;
            case WSResponseErrorCode.RateLimitIssues:
              console.log("You can no longer send more messages for today");
              break;
            default:
              console.log("Some other error");
              break;
          }
        },
      });
    },
  });
})();
