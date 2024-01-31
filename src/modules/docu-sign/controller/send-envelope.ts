import { EnvelopesApi } from "docusign-esign";
import { DocuSign } from "../singleton/docu-sign";
import { makeDocuSignEnvelope } from "../utils/envelope-creation.util";
import { DocuSignService } from "../service/docu-sign.service";

export async function sendEnvelope() {
  try {
    const envelope = await DocuSignService.getDocuSignService().docuSignCreateEnvelopeApi();
    const envelopeData = makeDocuSignEnvelope(); // Get envelope data    

    const result = await envelope.createEnvelope(
      "e930af09-7547-4903-aa70-07548f3ce795",
      {
        envelopeDefinition: envelopeData,
      }
    );

    return {
      envelopeId: result,
    };
  } catch (e) {
    console.log(e);
  }
}
