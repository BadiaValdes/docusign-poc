import { readFileSync } from "fs";
import {
  Document,
  Signer,
  SignHere,
  Recipients,
  EnvelopeDefinition,
  RecipientOption,
  RecipientGroup,
  ConditionalRecipientRuleFilter,
  Checkbox,
  ConditionalRecipientRuleCondition,
  ConditionalRecipientRule,
  RecipientRouting,
  WorkflowStep,
  Workflow,
} from "docusign-esign";

export function makeDocuSignEnvelopeWorkFlow() {
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
    const signer1: Signer = {
      email: "jebadia@soaint.com",
      name: "Jose Emilio Badia Valdes",
      recipientId: "1",
      routingOrder: "1",
    };

    const signer2: Signer = {
      email: "jebv.informatico@gmail.com",
      name: "Emilio",
      recipientId: "2",
      routingOrder: "2",
    };

    // SignHere document box

    const signHere1: SignHere = {
      documentId: "1",
      name: "firma",
      pageNumber: "1",
      recipientId: "1", // Is required
      tabLabel: "FirmaMe",
      tooltip: "Presione para firmar este documento",
      yPosition: "200",
      xPosition: "250",
    };

    const signHere2: SignHere = {
      documentId: "1",
      name: "firma",
      pageNumber: "1",
      recipientId: "2", // Is required
      tabLabel: "FirmaMe",
      tooltip: "Presione para firmar este documento",
      yPosition: "200",
      xPosition: "200",
    };

    signer1.tabs = {
      signHereTabs: [signHere1],
    };

    signer2.tabs = {
      signHereTabs: [signHere2],
    };

    // The persons who going to receive the message
    const recipient: Recipients = {
      signers: [signer1, signer2],     
    };

    // create the envelop
    const envelop: EnvelopeDefinition = {
      documents: [document],
      emailSubject: "Prueba de workflow 1",
      recipients: recipient,
      status: "sent",
      asynchronous: 'true',
    };

    return envelop;
  } catch (e) {
    console.log(e);
  }
}
