import { DocuSignService } from "../service/docu-sign.service";
import { makeDocuSignEnvelope } from "../utils/envelope-creation.util";
import { makeDocuSignEnvelopeWorkFlow } from "../utils/envelope-workflow-creation.util";

export async function workFlow() {
  try {
    const envelope =
      await DocuSignService.getDocuSignService().docuSignCreateEnvelopeApi();
    
      const envelopeData = makeDocuSignEnvelopeWorkFlow(); // Get envelope data

      console.log('send')
    const result = await envelope.createEnvelope(
      "e930af09-7547-4903-aa70-07548f3ce795",
      {
        envelopeDefinition: envelopeData,
      }
    );
    return result;
  } catch (e) {
    console.log(e);
  }
}
