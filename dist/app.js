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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_winston_1 = __importDefault(require("express-winston"));
var winston_1 = __importDefault(require("winston"));
var body_parser_1 = __importDefault(require("body-parser"));
var config_1 = __importDefault(require("./config"));
var models_1 = __importDefault(require("./models"));
var routes_1 = require("./src/routes");
var app_1 = require("firebase-admin/app");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var serviceAccount, app, port_1, swaggerDocument, _i, routers_1, router, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.default.sequelize.sync()];
            case 1:
                _a.sent();
                console.log("database success sync !!!");
                serviceAccount = require(config_1.default.firebase.serviceAccountFilePath);
                (0, app_1.initializeApp)({
                    credential: (0, app_1.cert)(serviceAccount),
                    databaseURL: config_1.default.firebase.databaseURL,
                });
                app = (0, express_1.default)();
                port_1 = config_1.default.port;
                app.use(body_parser_1.default.urlencoded({ extended: false }));
                app.use(body_parser_1.default.json());
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
                swaggerDocument = require('./openapi.json');
                app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
                for (_i = 0, routers_1 = routes_1.routers; _i < routers_1.length; _i++) {
                    router = routers_1[_i];
                    app.use(router.getPrefix(), router.getPreHandlers(), router.getRouter());
                }
                app.use(express_winston_1.default.errorLogger({
                    transports: [
                        new winston_1.default.transports.Console(),
                        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
                    ],
                    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json()),
                }));
                app.listen(port_1, function () {
                    console.log("server is listening on ".concat(port_1, " !!!"));
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = startServer;
