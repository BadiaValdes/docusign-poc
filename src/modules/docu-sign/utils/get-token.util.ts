// Import docusign api client. Install @types/docusign-esign for ts
import { IDocuSignToken } from "../interfaces/docu-sign-token.interface";
import { readFileSync } from "fs";
import { DocuSign } from "../singleton/docu-sign";
// Info to get from url
// user id: https://admindemo.docusign.com/apps-and-keys
// account id: https://admindemo.docusign.com/apps-and-keys
// integrationKey: https://admindemo.docusign.com/apps-and-keys
// PrivateKey: https://admindemo.docusign.com/apps-and-keys/overview/TU?INTEGRATIONKEY
// Base URL: “https://demo.docusign.net/restapi”
// domain: account-d.docusign.com
// signature:  [‘signature’, ‘impersonation’]

export async function getDocuSignToken(): Promise<IDocuSignToken> {
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
