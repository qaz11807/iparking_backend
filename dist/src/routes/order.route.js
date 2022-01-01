'use strict';
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : {'default': mod};
};
Object.defineProperty(exports, '__esModule', {value: true});
const route_1 = __importDefault(require('./route'));
const auth_middleware_1 = require('../middleware/auth-middleware');
const order_middleware_1 = require('../middleware/order-middleware');
const passport_1 = __importDefault(require('passport'));
const order_request_1 = require('../requests/order-request');
/** Class representing Order Route. */
class OrderRoute extends route_1.default {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/order';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.post('/', order_request_1.createOrderRequest, passport_1.default.authenticate('token', {session: false}), auth_middleware_1.permissionAuth, order_middleware_1.createOrder);
    }
}
exports.default = OrderRoute;
