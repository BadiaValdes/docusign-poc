import { EnvelopesApi } from "docusign-esign";
import { IDocuSignToken } from "../interfaces/docu-sign-token.interface";

export interface IDocuSignService {
     docuSignCreateEnvelopeApi(): Promise<EnvelopesApi>;
     getDocuSignToken(): Promise<IDocuSignToken>;
}