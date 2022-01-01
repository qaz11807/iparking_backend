'use strict';
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : {'default': mod};
};
Object.defineProperty(exports, '__esModule', {value: true});
const route_1 = __importDefault(require('./route'));
const auth_middleware_1 = __importDefault(require('../middleware/auth-middleware'));
const register_middleware_1 = __importDefault(require('../middleware/register-middleware'));
const passport_1 = __importDefault(require('passport'));
const auth_request_1 = require('../requests/auth-request');
const register_request_1 = require('../requests/register-request');
/** Class representing Auth Route. */
class AuthRoute extends route_1.default {
    /**
     * Create a routes.
     */
    constructor() {
        super();
        this.prefix = '/auth';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.post('/signin', auth_request_1.loginRequest, passport_1.default.authenticate('signin', {session: false}), auth_middleware_1.default);
        this.router.post('/register', register_request_1.registerRequest, register_middleware_1.default);
    }
}
exports.default = AuthRoute;
