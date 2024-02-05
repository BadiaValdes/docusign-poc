import { Request, Response, Router } from "express";
import { IRouter } from "../interfaces/router.interface";
import { DocuSignConnector } from "./connector/docu-sign.connector";
import { IDocuSignController } from "./interfaces/docu-sign-controller.interface";
import { docuSignControllerInstance } from "./controller/docu-sign.controller";
const router = Router();

class DocuSignRoutes implements IRouter {
  private docuSignController: IDocuSignController;
  constructor() {
    this.docuSignController = docuSignControllerInstance;
  }
  // eslint-disable-line
  get routes() {
    router.get("/auth", async (req: Request, res: Response) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const quote =
          await DocuSignConnector.getDocuSignConnector().getDocuSignToken();
        return res.send(quote);
      } catch (err) {
        throw err;
      }
    });

    router.get("/send", async (req: Request, res: Response) => {
      this.docuSignController.sendWithWorkFlow(req, res);
    });

    router.get("/envelope/:id", async (req: Request, res: Response) => {
      this.docuSignController.getEnvelope(req, res);
    });

    router.get(
      "/envelope/:id/documents",
      async (req: Request, res: Response) => {
        this.docuSignController.getDocumentList(req, res);
      }
    );

    router.post("/envelope/document", async (req: Request, res: Response) => {
      this.docuSignController.documentDownload(req, res);
    });
    return router;
  }
}

export default new DocuSignRoutes();
