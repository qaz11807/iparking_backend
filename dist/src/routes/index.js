'use strict';
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : {'default': mod};
};
Object.defineProperty(exports, '__esModule', {value: true});
exports.routers = void 0;
const auth_route_1 = __importDefault(require('./auth.route'));
const order_route_1 = __importDefault(require('./order.route'));
exports.routers = [
    new auth_route_1.default(),
    new order_route_1.default(),
];
