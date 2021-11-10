import Route from "../../lib/route";
import HttpMethod from "../../lib/httpMethods";
import Comment from '../../controllers/comments';
import { validateComment } from "../../validators/comment";

const COMMENT_URL = '/api/comments';

const Routes: Route[] = [
    {
        path: COMMENT_URL,
        method: HttpMethod.GET,
        middlewares: [],
        controller: [Comment.getComments]
    },
    {
        path: COMMENT_URL,
        method: HttpMethod.POST,
        middlewares: [validateComment],
        controller: [Comment.addComment]
    }
];

export default Routes;