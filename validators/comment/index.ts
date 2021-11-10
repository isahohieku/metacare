import * as Joi from 'joi';
import { RouteHandler } from '../../lib/route';
import { NextFunction, Request, Response } from 'express';
import CustomError from '../../responses/error/custom-error';

import httpCodes from '../../constants/http-status-codes';
import responseCodes from '../../constants/response-codes';
import responseMessages from '../../constants/response-messages';
import Logger from '../../utils/logger';

const commentValidator = Joi.object().keys({
    filmId: Joi.number().required(),
    comment: Joi.string().max(500).required()
});

const throwError = (next, details): void => {
    const error = new CustomError(responseCodes.BAD_REQUEST,
        responseMessages.BAD_REQUEST, httpCodes.BAD_REQUEST, details);
    Logger('validators/comment.ts', details, 'error');
    next(error);
};

const validateComment: RouteHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, commentValidator);
        next();
    } catch (e) {
        throwError(next, e.details);
    }
};

export {
    validateComment
};
