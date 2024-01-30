import { EnvelopesApi } from "docusign-esign";
import { DocuSign } from "../singleton/docu-sign";
import { makeDocuSignEnvelope } from "../utils/envelope-creation.util";
import { getDocuSignToken } from "../utils/get-token.util";

export async function sendEnvelope() {
  try {
    const token = await getDocuSignToken(); // Get token
    const envelopeData = makeDocuSignEnvelope(); // Get envelope data

    DocuSign.getDocuSign().addDefaultHeader(
      "Authorization",
      "Bearer " + token.accessToken
    ); // Add token to docuSign instance

    const envelope = new EnvelopesApi(DocuSign.getDocuSign());

    const result = await envelope.createEnvelope(
      "e930af09-7547-4903-aa70-07548f3ce795",
      {
        envelopeDefinition: envelopeData,
      }
    );

    console.log(result);

    return {
      envelopeId: result,
    };
  } catch (e) {
    console.log(e);
  }
}
