import { Request } from "express";
import { DocuSignService } from "../service/docu-sign.service";
export async function getDocumentList(req: Request) {
  try {
    const envelopId = req.params.id;
    const envelope =
      await DocuSignService.getDocuSignService().docuSignCreateEnvelopeApi();
    const envelopeData = await envelope.listDocuments(
      process.env.ACCOUNT_ID,
      envelopId
    );
    return envelopeData;
  } catch (e) {
    console.log(e);
  }
}
