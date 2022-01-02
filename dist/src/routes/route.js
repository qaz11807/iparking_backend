"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
/** Abstract Class representing Basic Route. */
var Route = /** @class */ (function () {
    function Route() {
        /* eslint-disable */
        this.router = (0, express_1.Router)();
        this.prefix = '/';
        this.auth = false;
    }
    /**
     * Get the router.
     * @return {Router} The router.
     */
    Route.prototype.getRouter = function () {
        return this.router;
    };
    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */
    Route.prototype.getPrefix = function () {
        return this.prefix;
    };
    /**
     * Get if use auth stragety.
     * @return {boolean} use auth stragety or not.
     */
    Route.prototype.isAuth = function () {
        return this.auth;
    };
    return Route;
}());
exports.default = Route;
