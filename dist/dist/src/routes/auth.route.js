"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDashBoardRoute = exports.AuthRoute = void 0;
const route_1 = require("./route");
const passport_1 = __importDefault(require("passport"));
/** middleware imported */
const validator_middleware_1 = require("../middleware/validator-middleware");
const auth_middleware_1 = require("../middleware/auth-middleware");
const register_middleware_1 = require("../middleware/register-middleware");
/** api request validator */
const auth_1 = __importDefault(require("../valiadtors/client/auth"));
/** Class representing Auth Route. */
class AuthRoute extends route_1.BaseRoute {
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
        this.router.post('/signin', (0, validator_middleware_1.schemaGetter)(auth_1.default.login), passport_1.default.authenticate('signin', { session: false }), auth_middleware_1.signin);
        this.router.post('/register', (0, validator_middleware_1.schemaGetter)(auth_1.default.register), register_middleware_1.registerUser);
    }
}
exports.AuthRoute = AuthRoute;
/** router for dashobard auth*/
class AuthDashBoardRoute extends route_1.BaseRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/auth';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.post('/signin', (0, validator_middleware_1.schemaGetter)(auth_1.default.login), passport_1.default.authenticate('signin', { session: false }), auth_middleware_1.permissionAuth, auth_middleware_1.signin);
    }
}
exports.AuthDashBoardRoute = AuthDashBoardRoute;
