import express from 'express';
import db from './models';
import expressWinston from 'express-winston';
import winston from 'winston';
import bodyParser from 'body-parser';
import passport from 'passport';
import {routers} from './src/routes';
import {initializeApp, cert} from 'firebase-admin/app';

const serviceAccount = require('./config/ipark-dev-6eaf6-firebase-adminsdk-jlepc-21c05de00b.json');

const startServer = async () => {
    try {
        await db.sequelize.sync();
        console.log(`database success sync !!!`);

        initializeApp({
            credential: cert(serviceAccount),
            databaseURL: 'https://ipark-dev-6eaf6.firebaseio.com',
        });

        const app = express();
        const port = 3000;

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

        for (const router of routers) {
            if (router.isAuth()) {
                app.use(router.getPrefix(), passport.authenticate('token', {session: false}), router.getRouter());
            } else {
                app.use(router.getPrefix(), router.getRouter());
            }
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
