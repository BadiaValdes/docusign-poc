import { Request, Response, Router } from 'express';
import { IRouter } from '../interfaces/router.interface';
import { getDocuSignToken } from './utils/get-token.util';
import { sendEnvelope } from './methods/send-envelope.util';
const router = Router();

class DocuSignRoutes implements IRouter{// eslint-disable-line
    get routes(){
        router.get('/auth', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                const quote = await getDocuSignToken()
                return res.send(quote);
            } catch (err) {
                throw err;
            }
        });
        router.get('/send', async (req: Request, res: Response) => {
            // eslint-disable-next-line no-useless-catch
            try {
                const quote = await sendEnvelope()
                return res.send(quote);
            } catch (err) {
                throw err;
            }
        });
        return router;
    }
}

export default new DocuSignRoutes();