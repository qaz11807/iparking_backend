"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const auth_route_1 = require("./auth.route");
const order_route_1 = require("./order.route");
const plate_route_1 = require("./plate.route");
const user_route_1 = require("./user.route");
const payment_route_1 = require("./payment.route");
const cloud_message_route_1 = require("./cloud-message.route");
const config_1 = __importDefault(require("../../config"));
const defaultAdminPrefix = config_1.default.defaultAdminPrefix;
exports.routers = [
    new auth_route_1.AuthRoute(),
    new order_route_1.OrderRoute(),
    new plate_route_1.PlateRoute(),
    new user_route_1.UserRoute(),
    new payment_route_1.PayRoute(),
    new auth_route_1.AuthDashBoardRoute(defaultAdminPrefix),
    new order_route_1.OrderAdminRoute(defaultAdminPrefix),
    new cloud_message_route_1.MessageAdminRoute(defaultAdminPrefix),
    new plate_route_1.PlatedminRoute(defaultAdminPrefix),
    new user_route_1.UserAdminRoute(defaultAdminPrefix),
];
