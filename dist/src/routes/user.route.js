"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdminRoute = exports.UserRoute = void 0;
const route_1 = require("./route");
const validator_middleware_1 = require("../middleware/validator-middleware");
/** middleware imported */
const UserApi = __importStar(require("../middleware/user-middleware"));
const register_middleware_1 = require("../middleware/register-middleware");
/** api request validator */
const user_1 = __importDefault(require("../valiadtors/client/user"));
const user_2 = __importDefault(require("../valiadtors/dashboard/user"));
/** Class representing Order Route. */
class UserRoute extends route_1.AuthRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/user';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.put('/token', (0, validator_middleware_1.schemaGetter)(user_1.default.updateToken), UserApi.user.updateDeviceToken);
    }
}
exports.UserRoute = UserRoute;
/**
 *
 */
class UserAdminRoute extends route_1.AdminRoute {
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    constructor(basePrefix) {
        super(basePrefix);
        this.prefix += '/user';
        this.setRoutes();
    }
    /**
     * Set the router's routes and middleware.
     */
    setRoutes() {
        this.router.get('/count', UserApi.admin.getCount);
        this.router.get('/my', UserApi.admin.getSelf);
        this.router.get('/', (0, validator_middleware_1.schemaGetter)(user_2.default.getAll), UserApi.admin.getAllUsers);
        this.router.post('/', (0, validator_middleware_1.schemaGetter)(user_2.default.create), register_middleware_1.registerUserWithRole);
        this.router.put('/:id', (0, validator_middleware_1.schemaGetter)(user_2.default.update), UserApi.admin.updateUser);
        this.router.get('/:id', (0, validator_middleware_1.schemaGetter)(user_2.default.get), UserApi.admin.getUser);
        this.router.delete('/:id', (0, validator_middleware_1.schemaGetter)(user_2.default.delete), UserApi.admin.deleteOrder);
    }
}
exports.UserAdminRoute = UserAdminRoute;
