import { Application } from 'express';
import bodyParser from "body-parser";

const PARSE_LIMIT = '20mb';
const PARAMETER_LIMIT = 15;

const requestParsing = (app: Application): void => {
    app.use(bodyParser.urlencoded({ limit: PARSE_LIMIT, parameterLimit: PARAMETER_LIMIT, extended: true }));
    app.use(bodyParser.json({ limit: PARSE_LIMIT, strict: true }));
};

export default requestParsing;