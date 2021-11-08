import { Application } from 'express';
import Route from '../route';
import Routes from '../../routes';

const configureRoutes = (app: Application): void => {
    for (const route of Routes as Route[]) {
        const { method, path, middlewares, controller } = route;
        app[method](path, middlewares, controller);
    };
};

export default configureRoutes;
