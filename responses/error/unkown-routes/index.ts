import { Request, Response } from 'express';
import Logger from '../../../utils/logger';
import throwError from '..';
import httpCodes from '../../../constants/http-status-codes';
import responseCodes from '../../../constants/response-codes';

const unknownRoute = (req: Request, res: Response): Response | void => {
    const message = `route: ${req.path} does not exist`;
    if (!req.route) {
        Logger('unknownroutes/index.ts', message, 'error');
        return throwError(res, responseCodes.NOT_FOUND, message, httpCodes.NOT_FOUND);
    }
};

export default unknownRoute;
