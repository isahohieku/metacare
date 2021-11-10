import Route from "../../lib/route";
import HttpMethod from "../../lib/httpMethods";
import Films from '../../controllers/films';

const FILMS_URL = '/api/films';

const Routes: Route[] = [
    {
        path: FILMS_URL,
        method: HttpMethod.GET,
        middlewares: [],
        controller: [Films.getFilms]
    }
];

export default Routes;