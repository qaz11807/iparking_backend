"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
var auth_route_1 = __importDefault(require("./auth.route"));
var order_route_1 = __importDefault(require("./order.route"));
var plate_route_1 = __importDefault(require("./plate.route"));
var user_route_1 = __importDefault(require("./user.route"));
var payment_route_1 = __importDefault(require("./payment.route"));
var cloud_message_route_1 = __importDefault(require("./cloud-message.route"));
exports.routers = [
    new auth_route_1.default(),
    new order_route_1.default(),
    new plate_route_1.default(),
    new user_route_1.default(),
    new payment_route_1.default(),
    new cloud_message_route_1.default(),
];
