import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import bodyParser from 'body-parser';
import config from '../config';
import db from '../models';
import {routers} from './routes';
import {initializeApp, cert, ServiceAccount} from 'firebase-admin/app';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import {Server} from 'socket.io';
import {createServer} from 'http';
import orderHandler from './middleware/socket-middleware';
import path from 'path';
import swaggerDocument from '../openapi.json';
import serviceAccount from '../firebase/iparking-40634-firebase-adminsdk-rkufr-79d084e0fa.json';
const startServer = async () => {
    try {
        await db.sequelize.sync();
        console.log(`database success sync !!!`);

        initializeApp({
            credential: cert(serviceAccount as ServiceAccount),
        });

        const app = express();
        const port = config.port;

        app.use(express.static('public'));

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(cors());

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

        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, '/index.html'));
        });

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

        const server = createServer(app);

        const io = new Server(server, {
            cors: {
                origin: 'http://localhost:3001',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });
        server.listen(port, ()=>{
            console.log(`server is listening on ${port} !!!`);
        });

        io.on('connection', (socket) => {
            console.log(`${socket.id} is connected!`);
            socket.on('disconnect', () => {
                console.log(`${socket.id} is disconnected!`);
            });
        });
        orderHandler(io);
    } catch (err) {
        throw err;
    }
};

export default startServer;
