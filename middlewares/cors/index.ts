import { Application } from 'express';
import cors from 'cors';

const appCors = (app: Application): void => {
    app.use(cors());
};

export default appCors;