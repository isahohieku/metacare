import * as Joi from 'joi';
import { RouteHandler } from '../../lib/route';
import { NextFunction, Request, Response } from 'express';
import CustomError from '../../responses/error/custom-error';

import httpCodes from '../../constants/http-status-codes';
import responseCodes from '../../constants/response-codes';
import responseMessages from '../../constants/response-messages';
import Logger from '../../utils/logger';

const commentValidator = Joi.object().keys({
    body: Joi.string().required(),
    article: Joi.string().required()
});

const commentUpdateValidator = Joi.object().keys({
    body: Joi.string().required(),
    id: Joi.string().required()
});


const throwError = (next, details): void => {
    const error = new CustomError(responseCodes.INVALID_PARAMS,
        responseMessages.FORBIDDEN, httpCodes.FORBIDDEN, details);
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

const validateCommentUpdate: RouteHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await Joi.validate(req.body, commentUpdateValidator);
        next();
    } catch (e) {
        throwError(next, e.details);
    }
};

export {
    validateComment,
    validateCommentUpdate
};
