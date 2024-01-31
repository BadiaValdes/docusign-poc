import { IDocuSignService } from "./docu-sign.interface";
import { readFileSync } from "fs";
import {
  Document,
  Signer,
  SignHere,
  Recipients,
  EnvelopeDefinition,
  EnvelopesApi,
} from "docusign-esign";
import { DocuSign } from "../singleton/docu-sign";
import { IDocuSignToken } from "../interfaces/docu-sign-token.interface";

export class DocuSignService implements IDocuSignService {
    private static docuSignService: IDocuSignService;
  private constructor() {
    console.log("Aqui");
  }

  public static getDocuSignService(){
    if(!this.docuSignService){
        DocuSignService.docuSignService = new DocuSignService();
    } 

    return DocuSignService.docuSignService;
  }

  async docuSignCreateEnvelopeApi(): Promise<EnvelopesApi> {
    const token = await this.getDocuSignToken(); // Get token
    this.docuSignSetToken(token); // Add token to docuSign instance
    return new EnvelopesApi(DocuSign.getDocuSign());
  }

  async getDocuSignToken(): Promise<IDocuSignToken> {
    const USER_ID = process.env.USER_ID; // user id
    const SCOPE = ["signature"]; // Scope for petition
    const JWT_LIFE_SEC = 10 * 60; // 10 minutes
    const INTEGRATION_KEY = process.env.INTEGRATION_KEY; // integration key

    const result = await DocuSign.getDocuSign().requestJWTUserToken(
      INTEGRATION_KEY,
      USER_ID,
      SCOPE,
      readFileSync("./private.key"),
      JWT_LIFE_SEC
    );

    return {
      accessToken: result.body.access_token,
      tokenExpiration: "test",
    };
  }

  private docuSignSetToken(token: any) {
    DocuSign.getDocuSign().addDefaultHeader(
      "Authorization",
      "Bearer " + token.accessToken
    ); // Add token to docuSign instance
  }

  private makeDocuSignEnvelope() {
    try {
      // This part will be used with a uploaded file
      const DOC = readFileSync("./test_file.pdf"); // Reading file
      const base64File = Buffer.from(DOC).toString("base64"); // Convert to base 64
      // This ends with the uploaded file converted in base 64

      // Create document object
      const document: Document = {
        documentBase64: base64File,
        documentId: "1",
        fileExtension: "pdf",
        name: "test_file",
      };

      // Signers for the document
      const signer: Signer = {
        email: "jebadia@soaint.com",
        name: "Emilio Badia",
        recipientId: "1",
      };

      // SignHere document box
      const signHere: SignHere = {
        documentId: "1",
        name: "firma",
        pageNumber: "1",
        recipientId: "1", // Is required
        tabLabel: "FirmaMe",
        tooltip: "Presione para firmar este documento",
        yPosition: "200",
        xPosition: "100",
      };

      signer.tabs = {
        signHereTabs: [signHere],
      };

      // The persons who going to receive the message
      const recipient: Recipients = {
        signers: [signer],
        carbonCopies: [
          {
            email: "jebv.informatico@gmail.com",
            name: "Emilio",
            recipientId: "2",
          },
        ],
      };

      // create the envelop
      const envelop: EnvelopeDefinition = {
        documents: [document],
        emailSubject: "Prueba de firma de datos 2",
        recipients: recipient,
        status: "sent",
      };

      envelop.status = "sent";

      return envelop;
    } catch (e) {
      console.log(e);
    }
  }
}
