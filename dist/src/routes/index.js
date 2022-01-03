"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
var auth_route_1 = __importDefault(require("./auth.route"));
var order_route_1 = require("./order.route");
var plate_route_1 = require("./plate.route");
var user_route_1 = require("./user.route");
var payment_route_1 = require("./payment.route");
var cloud_message_route_1 = require("./cloud-message.route");
var defaultAdminPrefix = '/dashboard';
exports.routers = [
    new auth_route_1.default(),
    new order_route_1.OrderRoute(),
    new plate_route_1.PlateRoute(),
    new user_route_1.UserRoute(),
    new payment_route_1.PayRoute(),
    new order_route_1.OrderAdminRoute(defaultAdminPrefix),
    new cloud_message_route_1.MessageAdminRoute(defaultAdminPrefix),
    new plate_route_1.PlatedminRoute(defaultAdminPrefix),
];
