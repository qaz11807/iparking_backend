import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import bodyParser from 'body-parser';
import config from './config';
import db from './models';
import {routers} from './src/routes';
import {initializeApp, cert} from 'firebase-admin/app';
import swaggerUI from 'swagger-ui-express';

const startServer = async () => {
    try {
        await db.sequelize.sync();
        console.log(`database success sync !!!`);

        const serviceAccount = require(config.firebase.serviceAccountFilePath);

        initializeApp({
            credential: cert(serviceAccount),
            databaseURL: config.firebase.databaseURL,
        });

        const app = express();
        const port = config.port;

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: 'combined.log'}),
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json(),
            ),
            meta: true,
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
        }));

        const swaggerDocument = require('./openapi.json');
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

        for (const router of routers) {
            app.use(router.getPrefix(), router.getPreHandlers(), router.getRouter());
        }

        app.use(expressWinston.errorLogger({
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: 'error.log', level: 'error'}),
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json(),
            ),
        }));

        app.listen(port, () => {
            console.log(`server is listening on ${port} !!!`);
        });
    } catch (err) {
        throw err;
    }
};

export default startServer;
