import { Request } from "express";
import fs from "fs";
import { DocuSignService } from "../service/docu-sign.service";
export async function documentDownload(req: Request) {
  try {
    const documentId = req.body.documentId;
    const envelopId = req.body.envelopeId;
    const envelope =
      await DocuSignService.getDocuSignService().docuSignCreateEnvelopeApi();
    const envelopeData = await envelope.getDocument(
      process.env.ACCOUNT_ID,
      envelopId,
      documentId,
      null
    );
    fs.writeFile("dat.pdf", new Buffer(envelopeData, "binary"), function (err) {
      if (err) console.log("Error: " + err);
    });
    return envelopeData;
  } catch (e) {
    console.log(e);
  }
}
