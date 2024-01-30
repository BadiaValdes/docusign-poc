import { Router } from 'express';
import { IRouter } from './interfaces/router.interface';
import userRouter from './user/userRouter'
import docuSignRoutes from './docu-sign/docu-sign.routes';

// Init router
const router = Router();

class BaseRouter implements IRouter{// eslint-disable-line
    get routes(){
        router.use('/users', userRouter.routes);
        router.use('/docu-sign', docuSignRoutes.routes);
        return router;
    }
}

export default new BaseRouter();