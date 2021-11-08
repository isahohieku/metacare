import { Response } from 'express';
import ResponseHandler from '../response-handler';
import httpCodes from '../../constants/http-status-codes';
import responseCodes from '../../constants/response-codes';
import responseMessage from '../../constants/response-messages';

interface ThrowErrorI {
    (res: Response, code?: string, message?: string, statusCode?: number, data?: any[] | undefined): Response;
}

/**
 * Sends a json response with an error status
 * @param res Response object
 * @param code Server custom error code
 * @param message Error message
 * @param statusCode HTTP status code
 * @param data Arbitary data
 */

const throwError: ThrowErrorI = (res: Response,
    code = responseCodes.INTERNAL_SERVER_ERROR,
    message = responseMessage.INTERNAL_SERVER_ERROR,
    statusCode = httpCodes.INTERNAL_SERVER_ERROR,
    data = undefined): Response => res.status(statusCode)
    .send(new ResponseHandler(code, statusCode, message, data));

export default throwError;