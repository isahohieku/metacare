
import { Response } from "express";
import httpCodes from '../../constants/http-status-codes';
import responseCodes from '../../constants/response-codes';
import responseMessages from '../../constants/response-messages';
import Logger from '../../utils/logger';
import APIResponse from '../response-handler';

const sendSuccess
    = (res: Response,
        mod: string,
        data?: object | object[] | undefined,
        message = responseMessages.NO_MESSAGE,
        pagination?: string | undefined
    ): Response => {
        Logger(mod, message, 'info');

        return res.status(httpCodes.SUCCESS)
            .send(new APIResponse(responseCodes.SUCCESS,
                httpCodes.SUCCESS, message, data, pagination));
    };

export default sendSuccess;