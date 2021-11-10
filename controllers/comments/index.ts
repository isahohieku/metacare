import { Request, Response, NextFunction } from 'express';
import sendSuccess from '../../responses/success';
import CustomError from '../../responses/error/custom-error';
import httpCodes from '../../constants/http-status-codes';
import responseCodes from '../../constants/response-codes';
import responseMessage from '../../constants/response-messages';
import CommentModel from '../../models/comments';

class LikeService {
    public constructor() { }

    public async getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await CommentModel.query().where({ ...req.query }).orderBy('createdAt', 'desc');
            sendSuccess(res, 'controller:comment', result);
        } catch (e) {
            next(e);
        }
    }

    public async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.socket.remoteAddress);
        try {
            const { filmId, comment } = req.body;
            const ipAddress = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress;

            if (!ipAddress) 
                throw new CustomError(responseCodes.FORBIDDEN, responseMessage.FORBIDDEN, httpCodes.FORBIDDEN);

            if (String(comment).length > 500) 
                throw new CustomError(
                    responseCodes.FORBIDDEN, 
                    'Comment must be less than 500 characters', 
                    httpCodes.FORBIDDEN
                );

            const newComment = await CommentModel.query().insert({
                author: ipAddress,
                comment,
                filmId
            });

            sendSuccess(res, 'controller:comment', newComment);
        } catch (e) {
            console.log('e', e);
            next(e);
        }
    }
}

export default new LikeService();