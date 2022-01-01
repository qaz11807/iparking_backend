'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const express_1 = require('express');
/** Abstract Class representing Basic Route. */
class Route {
    constructor() {
        this.router = (0, express_1.Router)();
        this.prefix = '/';
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
}
exports.default = Route;
