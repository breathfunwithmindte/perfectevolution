const express = require('express');
const NancyRouter = express.Router();

// const dialogflow = require('dialogflow');
// const uuid = require('uuid');


let type = "service_account"
let project_id = "nancy-277801"
let private_key_id = "88bac73a08151d8f6f48a0bde2ce28baec297bd6"
let private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC7S5twYbZJ+0NQ\nFVNzbDWx/ID8RObwSfieoMwlCS0lhlH9FjBpLKK1eB3mdFIKkT6ifDviY7P3w6pt\nLu/Ir4smiA5U3S6EBLY02zJ+SMhitG3ctNFABzoqzjOAiIXBIPzoHzMfvFXSBBka\noYoFY3o/uy9VLFYE0BrhU37qYodQs/dHsCr3rX1JyRl/bfev2R9RuyXj1NNouziw\nNyqRNfrS9vH01T+uFP/sn3MCDEv9g/A425iozTiVoOutGD03HSJD2z6ZpybVFcZ0\n26cIPyY7WPvSVOdbQY3BI6LY0kiBU8tALbFBwOHaLhlxrDb8RBkxStcyFSn9klRT\n4eljlu19AgMBAAECggEAJ7JDaGsJUf5Terx+YrMPYWExbGZlJQ4kh+hwRDRA8ZhZ\ntcC3c38uoDQscCz8u3kj05ftsFKt8Ogzba86SqhsH3dMRE/ZvUjrXmIL/miKMiNo\nOpRHWmD9wtdP4qDs6m1FtSPxt7r43ImaUYLl6DT4ktvnUQ/TznLWE6ZY+q/12pRh\nLM3/unORt+7BctD55mt2g57toPCsrFbgiEC1ejV1ALSy858NQzpyvvpaIo/mr74B\nOkPa4n+nAtt6gTBDPChcOpWRvEYVXgPejMHk2cS5TtdrXFhpPQQHKOaymo2SK/1H\nW0F+Y3ILJZHPD0XbQ2dztN4LBtw/G6FEBhNWCpM6aQKBgQDoKFfex5wSaYq1/bSU\n7Vd0d+VTwUPnyMeUEIW149JM05cPOstQsG88+AxM45vjuczo4yWZG2VqvTGoHdZ6\nQdrQH2U/ZIhFMtMo1XFxSf9UJCfFidtYT35EbnwbyNTeq0z+R34M9RRzBSIyG0uE\n683n6p51wtUHHRhu1ZljGg5uVQKBgQDOh8pMBdbHWEVUcX4/nrQq1n3Ajhdq0g7S\nHJqfAiRO4+Cp6hKK57PVXlWsQ8AXGsFDN//7xuEdtTlTbMc9MXNIY6cOiipdivXI\nnQioLFmTUO84EOJluz2zfcZDszkQLmZ3Jo1qDU/S+aZRk6aDWSHxAQx35xsz5RJ8\nhb7ZTsRaiQKBgGDMoYbUd/D9bMbhWDBYngSEEWzQwr2cbAsCsJ3ctk0uVGgXPbsR\nNfCYBJjytodHa3cXbw/d6nWNGW1ds5Yaa2AoFxFNm7wuqvj1tm1kS0AMK0Ekb/7s\ndluWLc1v+cI2bs3/hUFl1vb2hwGZe+2aXKp8m0HC0Qw8R3m/OkumC6pZAoGASwVs\naJ0eXZ8k3/2x/G4rx/vOBioXO4g+NfiJ+gSPJ9EDBPWv8qEj4/e2azLZDgt79Gzd\nIZomn+H6huFWplXWKI96WX+6z+vwSAUy5dPmXeriWp1Xf9i6Gv8vC9yId+ZC9jkc\n2U8oldx1m+BkdgXknGTjIJLkgL9PLchvgQRpsvECgYBvQBWhkUUNuI3np7Q5N5vE\nkF1dz7+gPXGV3YtQGrofY5do/evkL1KH9fG83T+GqIjZRSRd7IWIqh9AfnYsKlan\nFWa59QlP2EKXg9ro9HjeZ4fCsPiNSijdKud8w3DUJ0Gvi/g8+k7eTgJ7yagJYM+O\nDG/clcQEjGsAEhDSSQOhJg==\n-----END PRIVATE KEY-----\n"
let client_email = "nancy-754@nancy-277801.iam.gserviceaccount.com"
let client_id = "109373803114013232069"
let auth_uri = "https://accounts.google.com/o/oauth2/auth"
let token_uri = "https://oauth2.googleapis.com/token"
let auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs"
let client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/nancy-754%40nancy-277801.iam.gserviceaccount.com"

const projectId = "nancy-277801"
const sessionId = "nancoula"
const languageCode = "en-US"

// const sessionClient = new dialogflow.SessionsClient();
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);
// 
NancyRouter.post('/messenger', async (req, res) => {

   const request = {
      session: sessionPath,
      queryInput: {
         text: {
            text: req.body.text,
            languageCode: languageCode
         }
      }
   }

   const responses = await sessionClient.detectIntent(request);
   const result = response[0].queryResult;

   res.send(result)
})

module.exports = NancyRouter;