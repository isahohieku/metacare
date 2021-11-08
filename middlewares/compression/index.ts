import { Application } from 'express';
import compression from 'compression';

const appCompression = (app: Application): void => {
    app.use(compression());
};

export default appCompression;