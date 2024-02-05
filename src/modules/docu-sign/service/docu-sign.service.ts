import fs from "fs";
import { IDocuSignService } from "../interfaces/docu-sign-service.interface";
import { DocuSignConnector } from "../connector/docu-sign.connector";
import { makeDocuSignEnvelope } from "../utils/envelope-creation.util";
import { makeDocuSignEnvelopeWorkFlow } from "../utils/envelope-workflow-creation.util";

class DocuSignService implements IDocuSignService {
  public constructor() {
    console.log("Aqui");
  }
  async documentDownload(documentId: string, envelopeId: string) {
    try {
      const envelope =
        await DocuSignConnector.getDocuSignConnector().docuSignCreateEnvelopeApi();
      const envelopeData = await envelope.getDocument(
        process.env.ACCOUNT_ID,
        envelopeId,
        documentId,
        null
      );
      // Write to disk
      fs.writeFile(
        "dat.pdf",
        new Buffer(envelopeData, "binary"),
        function (err) {
          if (err) console.log("Error: " + err);
        }
      );
      return envelopeData;
    } catch (e) {
      console.log(e);
    }
  }
  async getDocumentList(envelopeId: string): Promise<any> {
    try {
      const envelopId = envelopeId;
      const envelope =
        await DocuSignConnector.getDocuSignConnector().docuSignCreateEnvelopeApi();
      const envelopeData = await envelope.listDocuments(
        process.env.ACCOUNT_ID,
        envelopId
      );
      return envelopeData;
    } catch (e) {
      console.log(e);
    }
  }
  async getEnvelope(envelopeId: string): Promise<any> {
    try {
      const envelope =
        await DocuSignConnector.getDocuSignConnector().docuSignCreateEnvelopeApi();
      const envelopeData = await envelope.getEnvelope(
        process.env.ACCOUNT_ID,
        envelopeId
      );
      return envelopeData;
    } catch (e) {
      console.log(e);
    }
  }
  async sendEnvelope() {
    try {
      const envelope =
        await DocuSignConnector.getDocuSignConnector().docuSignCreateEnvelopeApi();
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
  async sendWithWorkFlow() {
    try {
      const envelope =
        await DocuSignConnector.getDocuSignConnector().docuSignCreateEnvelopeApi();

      const envelopeData = makeDocuSignEnvelopeWorkFlow(); // Get envelope data

      console.log("send");
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
}

export const docuSignService = new DocuSignService();
