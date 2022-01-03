"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = exports.AuthRoute = exports.BaseRoute = void 0;
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var auth_middleware_1 = require("../middleware/auth-middleware");
/** Abstract Class representing Basic Route. */
var BaseRoute = /** @class */ (function () {
    /**
     * Create a routes with basePrefix.
     * @param {string} basePrefix The basePrefix.
     */
    function BaseRoute(basePrefix) {
        /* eslint-disable */
        this.router = (0, express_1.Router)();
        this.prefix = '/';
        this.preHandlers = [];
        if (basePrefix) {
            this.prefix = basePrefix;
        }
    }
    /**
     * Get the router.
     * @return {Router} The router.
     */
    BaseRoute.prototype.getRouter = function () {
        return this.router;
    };
    /**
     * Get the route's prefix.
     * @return {string} The prefix.
     */
    BaseRoute.prototype.getPrefix = function () {
        return this.prefix;
    };
    /**
     * Get the pre handlers.
     * @return {Handler} The handler.
     */
    BaseRoute.prototype.getPreHandlers = function () {
        return this.preHandlers;
    };
    return BaseRoute;
}());
exports.BaseRoute = BaseRoute;
/** Abstract Class representing Auth Route.*/
var AuthRoute = /** @class */ (function (_super) {
    __extends(AuthRoute, _super);
    function AuthRoute() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.preHandlers = [passport_1.default.authenticate('token', { session: false })];
        return _this;
    }
    return AuthRoute;
}(BaseRoute));
exports.AuthRoute = AuthRoute;
/** Abstract Class representing Admin Route.*/
var AdminRoute = /** @class */ (function (_super) {
    __extends(AdminRoute, _super);
    function AdminRoute() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.preHandlers = __spreadArray(__spreadArray([], _this.preHandlers, true), [auth_middleware_1.permissionAuth], false);
        return _this;
    }
    return AdminRoute;
}(AuthRoute));
exports.AdminRoute = AdminRoute;
