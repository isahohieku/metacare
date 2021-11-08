import { Application } from 'express';
import bodyParser from './bodyParser';
import compression from './compression';
import cors from './cors';
import helmet from './helmet';

const middlewares = [
    bodyParser,
    compression,
    cors,
    helmet
];

const middlewaresConfig = (app: Application): void => {
    for (let middleware of middlewares) {
        middleware(app);
    }
};

export default middlewaresConfig;