import { Application } from 'express';
import helmet from 'helmet';

const appHelmet = (app: Application): void => {
    app.use(helmet());
};

export default appHelmet;