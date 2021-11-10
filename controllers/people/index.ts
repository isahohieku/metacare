import { Request, Response, NextFunction } from 'express';
import sendSuccess from '../../responses/success';
import {
    getPeopleRequest,
    SortPeopleOptions,
    OtherPeopleProperties,
    sortedItems,
    Order,
    sumData,
    convertCmToInches
} from '../../lib/swapi';

class PeopleController {
    public constructor() { }

    public async getPeople(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { sort, query, order, ...rest } = req.query;

            let { data: { results: people } } = await getPeopleRequest();

            // filter keys
            const filters = Object.keys(rest);

            // search keys
            const searchs = Object.values({ ...SortPeopleOptions, ...OtherPeopleProperties });

            // Apply Filters to characters
            people = people.filter((character): boolean =>
                filters.every((filter): boolean => rest[filter] === character[filter]));

            // Apply Search for characters
            if (query) {
                people = people.filter((character): boolean =>
                    searchs.some((search): boolean => character[search].toLowerCase()
                        .includes(String(query).toLowerCase())));
            }

            // Sort characters
            people = sortedItems(people, sort as SortPeopleOptions | OtherPeopleProperties, order as Order);

            const totalHeights = sumData(people.map(({ height }): number => parseFloat(height)));

            const response = {
                people,
                metadata: {
                    totalCharacters: people.length,
                    totalHeights: { cm: `${totalHeights}cm`, feetInches: convertCmToInches(totalHeights) }
                }
            };

            sendSuccess(res, 'controller:people', response);
        } catch (e) {
            next(e);
        }
    }
}

export default new PeopleController();