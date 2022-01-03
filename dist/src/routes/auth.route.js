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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("./route");
var auth_middleware_1 = require("../middleware/auth-middleware");
var register_middleware_1 = __importDefault(require("../middleware/register-middleware"));
var passport_1 = __importDefault(require("passport"));
var auth_request_1 = require("../requests/auth-request");
var register_request_1 = require("../requests/register-request");
/** Class representing Auth Route. */
var AuthRouter = /** @class */ (function (_super) {
    __extends(AuthRouter, _super);
    /**
     * Create a routes.
     */
    function AuthRouter() {
        var _this = _super.call(this) || this;
        _this.prefix = '/auth';
        _this.setRoutes();
        return _this;
    }
    /**
     * Set the router's routes and middleware.
     */
    AuthRouter.prototype.setRoutes = function () {
        this.router.post('/signin', auth_request_1.loginRequest, passport_1.default.authenticate('signin', { session: false }), auth_middleware_1.signin);
        this.router.post('/register', register_request_1.registerRequest, register_middleware_1.default);
    };
    return AuthRouter;
}(route_1.BaseRoute));
exports.default = AuthRouter;
