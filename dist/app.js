'use strict';
const __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : {'default': mod};
};
Object.defineProperty(exports, '__esModule', {value: true});
const express_1 = __importDefault(require('express'));
const models_1 = __importDefault(require('./models'));
const express_winston_1 = __importDefault(require('express-winston'));
const winston_1 = __importDefault(require('winston'));
const body_parser_1 = __importDefault(require('body-parser'));
const passport_1 = __importDefault(require('passport'));
const routes_1 = require('./src/routes');
const auth_middleware_1 = require('./src/middleware/auth-middleware');
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.sequelize.sync();
        console.log(`database success sync !!!`);
        const app = (0, express_1.default)();
        const port = 3000;
        app.use(body_parser_1.default.urlencoded({extended: false}));
        app.use(body_parser_1.default.json());
        app.get('/', passport_1.default.authenticate('token', {session: false}), (req, res) => {
            res.json('Success!');
        });
        app.get('/test', passport_1.default.authenticate('token', {session: false}), auth_middleware_1.permissionAuth, (req, res) => {
            res.json('Success!');
        });
        app.use(express_winston_1.default.logger({
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({filename: 'combined.log'}),
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
            meta: true,
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
        }));
        for (const router of routes_1.routers) {
            app.use(router.getPrefix(), router.getRouter());
        }
        app.use(express_winston_1.default.errorLogger({
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({filename: 'error.log', level: 'error'}),
            ],
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
        }));
        app.listen(port, () => {
            console.log(`server is listening on ${port} !!!`);
        });
    } catch (err) {
        throw err;
    }
});
exports.default = startServer;
