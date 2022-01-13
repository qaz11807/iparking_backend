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
exports.PayRoute = void 0;
const route_1 = require("./route");
const passport_1 = __importDefault(require("passport"));
/** middleware imported */
const PayApi = __importStar(require("../middleware/payment-middleware"));
const validator_middleware_1 = require("../middleware/validator-middleware");
/** api request validator */
const pay_1 = __importDefault(require("../valiadtors/client/pay"));
/** Class representing Order Route. */
class PayRoute extends route_1.BaseRoute {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/pay';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.post('/callback/:id', PayApi.user.paidResultCallback);
        this.router.get('/:id', passport_1.default.authenticate('token', { session: false }), (0, validator_middleware_1.schemaGetter)(pay_1.default.getPayUrl), PayApi.user.getPayUrl);
    }
}
exports.PayRoute = PayRoute;
