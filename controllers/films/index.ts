import { Request, Response, NextFunction } from 'express';
import sendSuccess from '../../responses/success';
import {
    getFilmsRequest,
    sortedItems,
    Order,
    SortFilmsOptions,
    OtherFilmsProperties
} from '../../lib/swapi';
import CommentModel from '../../models/comments';

class FilmsController {
    public constructor() { }

    public async getFilms(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { query, order, ...rest } = req.query;
            let { sort } = req.query;

            let { data: { results: films } } = await getFilmsRequest();

            // filter keys
            const filters = Object.keys(rest);

            // search keys
            const searchs = Object.values({ ...SortFilmsOptions, ...OtherFilmsProperties });

            // Apply Filters to films
            films = films.filter((film): boolean =>
                filters.every((filter): boolean => rest[filter] === film[filter]));

            // Apply Search for films
            if (query) {
                films = films.filter((film): boolean =>
                    searchs.some((search): boolean => film[search].toLowerCase()
                        .includes(String(query).toLowerCase())));
            }

            // Sort films
            films = sortedItems(films, sort = SortFilmsOptions.releaseDate, order as Order);

            const filmsWithComments = [];

            for (const film of films) {
                const id = film.url.split('/').filter((item): boolean => !isNaN(parseInt(item)))[0];
                const commentsCount = await CommentModel.query().where({ filmId: id }).count();

                filmsWithComments.push({ ...film, ...commentsCount[0] });
            }

            const response = {
                films: filmsWithComments,
                metadata: {
                    totalfilms: films.length
                }
            };

            sendSuccess(res, 'controller:films', response);
        } catch (e) {
            next(e);
        }
    }
}

export default new FilmsController();