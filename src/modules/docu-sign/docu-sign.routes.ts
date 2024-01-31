import { Request, Response, Router } from "express";
import { IRouter } from "../interfaces/router.interface";
import { getDocuSignToken } from "./service/get-token.util";
import { sendEnvelope } from "./controller/send-envelope";
import { getEnvelope } from "./controller/get-envelope";
import { documentDownload } from "./controller/download-document-envelope.controller";
import fs from 'fs';
const router = Router();

class DocuSignRoutes implements IRouter {
  // eslint-disable-line
  get routes() {
    router.get("/auth", async (req: Request, res: Response) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const quote = await getDocuSignToken();
        return res.send(quote);
      } catch (err) {
        throw err;
      }
    });
    router.get("/send", async (req: Request, res: Response) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const quote = await sendEnvelope();
        return res.send(quote);
      } catch (err) {
        throw err;
      }
    });
    router.get("/envelope/:id", async (req: Request, res: Response) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const quote = await getEnvelope(req);
        return res.send(quote);
      } catch (err) {
        throw err;
      }
    });
    router.get(
      "/envelope/:id/documents",
      async (req: Request, res: Response) => {
        // eslint-disable-next-line no-useless-catch
        try {
          const quote = await getEnvelope(req);
          return res.send(quote);
        } catch (err) {
          throw err;
        }
      }
    );
    router.post("/envelope/document", async (req: Request, res: Response) => {
      // eslint-disable-next-line no-useless-catch
      try {
        const quote = await documentDownload(req);
        return res.send(quote);
      } catch (err) {
        throw err;
      }
    });
    return router;
  }
}

export default new DocuSignRoutes();
