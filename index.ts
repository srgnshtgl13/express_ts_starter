import express, {Response, Request} from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import dotenv from 'dotenv';
import { CommonRoutesConfig } from './src/common/common.routes.config';
import { UsersRoutes } from './src/users/routes';

dotenv.config();

const app: express.Application = express();
const server = http.createServer(app);
const routes: CommonRoutesConfig[] = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());
const corsOptions: cors.CorsOptions = {
    origin: process.env?.FE_APP_URL || "http://127.0.0.1:8080",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    )
}
const isDebug = Boolean(process.env.DEBUG) || false;
if(isDebug) {
    loggerOptions.meta = false; // when not debugging, log request as one-liners
}
app.use(expressWinston.logger(loggerOptions));
routes.push(new UsersRoutes(app));

const port = process.env.PORT || 3000;
const runMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: Request, res: Response) => {
    res.status(200).send(runMessage)
});

app.use('*', (req: Request, res: Response) => {
    return res.status(404).json({
        message: 'url-not-found'
    });
})

server.listen(port, () => {
    routes.forEach((route:CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`)
    })
    console.log(runMessage);
})
