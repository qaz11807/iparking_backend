"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAdminRoute = void 0;
const route_1 = require("./route");
/** middleware imported */
const MessageApi = __importStar(require("../middleware/cloud-message-middleware"));
const validator_middleware_1 = require("../middleware/validator-middleware");
/** api request validator */
const cloud_message_1 = __importDefault(require("../valiadtors/dashboard/cloud-message"));
/** Class representing Dashboard Simulated Route. */
class MessageAdminRoute extends route_1.AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/simulate';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        /** Admin */
        this.router.post('/enter', (0, validator_middleware_1.schemaGetter)(cloud_message_1.default.simulateEnter), MessageApi.admin.simulateEnter);
        this.router.post('/exit', (0, validator_middleware_1.schemaGetter)(cloud_message_1.default.simulateExit), MessageApi.admin.simulateExit);
    }
}
exports.MessageAdminRoute = MessageAdminRoute;
