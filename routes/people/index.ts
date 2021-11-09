import Route from "../../lib/route";
import HttpMethod from "../../lib/httpMethods";
import People from '../../controllers/people';

const PEOPLE_URL = '/api/people';

const Routes: Route[] = [
    {
        path: PEOPLE_URL,
        method: HttpMethod.GET,
        middlewares: [],
        controller: [People.getPeople]
    }
];

export default Routes;