"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_winston_1 = __importDefault(require("express-winston"));
const winston_1 = __importDefault(require("winston"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("../config"));
const models_1 = __importDefault(require("../models"));
const routes_1 = require("./routes");
const app_1 = require("firebase-admin/app");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socket_middleware_1 = __importDefault(require("./middleware/socket-middleware"));
const path_1 = __importDefault(require("path"));
const openapi_json_1 = __importDefault(require("../openapi.json"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.sequelize.sync();
        console.log(`database success sync !!!`);
        (0, app_1.initializeApp)({
            credential: (0, app_1.applicationDefault)(),
        });
        const app = (0, express_1.default)();
        const port = config_1.default.port;
        app.use(express_1.default.static('public'));
        app.use(body_parser_1.default.urlencoded({ extended: false }));
        app.use(body_parser_1.default.json());
        app.use((0, cors_1.default)());
        app.use(express_winston_1.default.logger({
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'combined.log' }),
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
            meta: true,
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
        }));
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openapi_json_1.default));
        app.get('/', function (req, res) {
            res.sendFile(path_1.default.join(__dirname, '/index.html'));
        });
        for (const router of routes_1.routers) {
            app.use(router.getPrefix(), router.getPreHandlers(), router.getRouter());
        }
        app.use(express_winston_1.default.errorLogger({
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
        }));
        const server = (0, http_1.createServer)(app);
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: 'http://localhost:3001',
                methods: ['GET', 'POST'],
                credentials: true,
            },
        });
        server.listen(port, () => {
            console.log(`server is listening on ${port} !!!`);
        });
        io.on('connection', (socket) => {
            console.log(`${socket.id} is connected!`);
            socket.on('disconnect', () => {
                console.log(`${socket.id} is disconnected!`);
            });
        });
        (0, socket_middleware_1.default)(io);
    }
    catch (err) {
        throw err;
    }
});
exports.default = startServer;
