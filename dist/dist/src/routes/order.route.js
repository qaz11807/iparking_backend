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
exports.OrderAdminRoute = exports.OrderRoute = void 0;
const route_1 = require("./route");
/** middleware imported */
const validator_middleware_1 = require("../middleware/validator-middleware");
const OrderApi = __importStar(require("../middleware/order-middleware"));
/** api request validator */
const order_1 = __importDefault(require("../valiadtors/client/order"));
const order_2 = __importDefault(require("../valiadtors/dashboard/order"));
/** Class representing Order Route. */
class OrderRoute extends route_1.AuthRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/order';
        this.preHandlers = [...this.preHandlers];
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.get('/', (0, validator_middleware_1.schemaGetter)(order_1.default.getAll), OrderApi.user.getAllOrders);
        this.router.get('/latest', OrderApi.user.getLatestOrder);
        this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(order_1.default.replyOrder), OrderApi.user.replyOrderChoice);
        this.router.delete('/:id', (0, validator_middleware_1.schemaGetter)(order_1.default.delete), OrderApi.user.deleteOrder);
    }
}
exports.OrderRoute = OrderRoute;
/** */
class OrderAdminRoute extends route_1.AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/order';
        this.preHandlers = [...this.preHandlers];
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.get('/count', OrderApi.admin.getCount);
        this.router.get('/', (0, validator_middleware_1.schemaGetter)(order_2.default.getAll), OrderApi.admin.getAllOrders);
        this.router.get('/:id', (0, validator_middleware_1.schemaGetter)(order_2.default.get), OrderApi.admin.getOrder);
        this.router.post('/', (0, validator_middleware_1.schemaGetter)(order_2.default.create), OrderApi.admin.createOrder);
        this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(order_2.default.update), OrderApi.admin.updateOrder);
        this.router.delete('/:id', (0, validator_middleware_1.schemaGetter)(order_2.default.delete), OrderApi.admin.deleteOrder);
    }
}
exports.OrderAdminRoute = OrderAdminRoute;