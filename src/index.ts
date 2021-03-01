import * as dotenv from "dotenv";
import express from 'express';
import http from 'http';
import bodyparser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import helmet from "helmet";
import {connect} from './common/Database';
import {CommonRoutesConfig} from './routes/CommonRoutesConfig';
import {UsersRoutes} from './routes/UsersRoutes';
import debug from 'debug';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const PORT: Number = parseInt(process.env.PORT as string, 10);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(bodyparser.json());
app.use(cors());
app.use(helmet());

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

routes.push(new UsersRoutes(app));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));


app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at http://localhost:${PORT}`)
});
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    connect();
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});