import httpCodes from '../../../constants/http-status-codes';
import responseCodes from '../../../constants/response-codes';
import responseMessages from '../../../constants/response-messages';

export default class CustomError extends Error {
    public code: string = responseCodes.INTERNAL_SERVER_ERROR;
    public statusCode: number = httpCodes.INTERNAL_SERVER_ERROR ;
    public message: string = responseMessages.INTERNAL_SERVER_ERROR;
    public data: undefined | any[];

    public constructor(
        code: string,
        message: string,
        statusCode: number,
        data?: [] | undefined,
        ...params: []) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }

        this.code = code;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}