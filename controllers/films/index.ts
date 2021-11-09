import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import sendSuccess from '../../responses/success';
// import { Comment, CommentI } from '../../models/comments';
import CustomError from '../../responses/error/custom-error';
import httpCodes from '../../constants/http-status-codes';
import responseCodes from '../../constants/response-codes';
import responseMessage from '../../constants/response-messages';
import { makeRequest, swapiResource } from 'lib/swapi';

class CharacterController {
    public constructor() { }

    public async getCharacter(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id, title, crawl, producer, release_date: releaseDate } = req.query;

            if (id) {
                const { data } = await makeRequest(swapiResource.people);
                console.log('data', data);
            }


            // let result = article ? await Comment.find({ article, author: user.id })
            //     : await Comment.find({ author: user.id });

            // sendSuccess(res, 'controller:comment', result);

        } catch (e) {
            next(e);
        }
    }
}

export default new CharacterController();