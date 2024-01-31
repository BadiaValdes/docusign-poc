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
}
