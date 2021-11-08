import { Request, Response, NextFunction } from 'express';
import sendSuccess from '../../responses/success';
// import { Comment, CommentI } from '../../models/comments';
import CustomError from '../../responses/error/custom-error';
import httpCodes from '../../constants/http-status-codes';
import responseCodes from '../../constants/response-codes';
import responseMessage from '../../constants/response-messages';

class LikeService {
    public constructor() { }

    public async getComments(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { article } = req.query;

            // let result = article ? await Comment.find({ article, author: user.id })
            //     : await Comment.find({ author: user.id });

            // sendSuccess(res, 'controller:comment', result);

        } catch (e) {
            next(e);
        }
    }

    public async addComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { body, article } = req.body;

            // const user: Partial<UserI> = verifyTok(null, null, token);

            // const query = new Comment();
            // query.author = user.id;
            // query.body = body as string;
            // query.article = article;

            // const result = await query.save();

            // sendSuccess(res, 'controller:comment', result);
            return;

        } catch (e) {
            next(e);
        }
    }

    public async updateComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // const { body, id } = req.body;

            // const token: string = pickToken(req);
            // const user: Partial<UserI> = verifyTok(null, null, token);

            // const comment: CommentI = await Comment.findOne({ _id: id });

            // if (comment) {
            //     if (String(comment.author) !== user.id) {
            //         throw new CustomError(responseCodes.FORBIDDEN,
            //             'You have no privilege to perform this action', httpCodes.FORBIDDEN);
            //     }
            // }

            // const params: Partial<CommentI> = { body };

            // const result = await Comment.findOneAndUpdate({ _id: id }, params, { new: true });

            // sendSuccess(res, 'controller:comment', result);
            // return;

        } catch (e) {
            next(e);
        }
    }

    public async deleteComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.query;

            if (!id) {
                throw new CustomError(responseCodes.INVALID_PARAMS,
                    'id of comment required', httpCodes.FORBIDDEN);
            }

            // const token: string = pickToken(req);
            // const user: Partial<UserI> = verifyTok(null, null, token);

            // const comment: CommentI = await Comment.findOne({ _id: id as string });

            // if (comment) {
            //     if (String(comment.author) !== String(user.id)) {
            //         throw new CustomError(responseCodes.FORBIDDEN,
            //             'You have no privilege to perform this action', httpCodes.FORBIDDEN);
            //     }
            // }

            // const result = await Comment.findOneAndDelete({ _id: id });

            // sendSuccess(res, 'controller:comment', result);
            return;

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

export default new LikeService();