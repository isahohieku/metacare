import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import express, {Express, Request, Response } from 'express';
import { createServer, Server as HTTPServer } from 'http';
// import Db from '../db';
import swaggerUi from 'swagger-ui-express';
import Logger from '../utils/logger';
import middlewares from '../middlewares';
import routes from '../lib/routesConfig';
import unknownRouteConfig from '../responses/error/unkown-routes';
import errorHandlerConfig from '../responses/error/error-handler';
import * as swaggerDocument from '../doc/swagger.json';

export default class Server {
    private httpServer: HTTPServer;
    public app: Express;

    public constructor() {
        this.setupDb();
        this.initializeApp();
        this.setupViewEngine();
        this.configureMiddlewares();
        this.handleLandingPage();
        this.handleSwaggerUI();
        this.configureRoutes();
        this.handleMissingRoutes();
        this.handleErrorsGlobally();
    }

    private initializeApp(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
    }

    private configureMiddlewares(): void {
        middlewares(this.app);
    }

    private configureRoutes(): void {
        routes(this.app);
    }

    private handleMissingRoutes(): void {
        this.app.use(unknownRouteConfig);
    }

    private handleErrorsGlobally(): void {
        this.app.use(errorHandlerConfig);
    }

    private handleSwaggerUI(): void {
        this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    private handleLandingPage(): void {
        this.app.get('/', (req: Request, res: Response): void => {
            res.render('index');
        });
    }

    private setupDb(): void {
        /* Setup Db */
        // Db();
    } 

    private setupViewEngine(): void {
        this.app.set('views', path.join(__dirname, '../', 'public'));
        this.app.use(express.static(path.join(__dirname, '../', 'public/assets/styles')));
        this.app.use(express.static(path.join(__dirname, '../', 'public/assets/img')));
        this.app.set('view engine', 'pug');
    }

    public listen(): void {
        /* App initialization */
        const { PORT } = process.env;
        this.httpServer.listen(PORT, (): void => {
            Logger('server/index.ts', `App is listening on port ${PORT}`, 'info');
        });
    }
}