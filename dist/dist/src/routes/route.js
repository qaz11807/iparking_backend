"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = exports.AuthRoute = exports.BaseRoute = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_middleware_1 = require("../middleware/auth-middleware");
/** Abstract Class representing Basic Route. */
class BaseRoute {
    /**
     * Create a routes with basePrefix.
     * @param {string} basePrefix The basePrefix.
     */
    constructor(basePrefix) {
        /* eslint-disable */
        this.router = (0, express_1.Router)();
        this.prefix = '/';
        this.preHandlers = [];
        if (basePrefix) {
            this.prefix = basePrefix;
        }
        else {
            this.prefix = '';
        }
    }
    /**
     * Get the router.
     * @return {Router} The router.
     */
    getRouter() {
        return this.router;
    }
    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */
    getPrefix() {
        return this.prefix;
    }
    /**
     * Get the pre handlers.
     * @return {Handler} The handler.
     */
    getPreHandlers() {
        return this.preHandlers;
    }
}
exports.BaseRoute = BaseRoute;
/** Abstract Class representing Auth Route.*/
class AuthRoute extends BaseRoute {
    constructor() {
        super(...arguments);
        this.preHandlers = [passport_1.default.authenticate('token', { session: false })];
    }
}
exports.AuthRoute = AuthRoute;
/** Abstract Class representing Admin Route.*/
class AdminRoute extends AuthRoute {
    constructor() {
        super(...arguments);
        this.preHandlers = [...this.preHandlers, auth_middleware_1.permissionAuth];
    }
}
exports.AdminRoute = AdminRoute;
