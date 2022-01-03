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
exports.MessageAdminRoute = void 0;
var route_1 = require("./route");
/** middleware imported */
var auth_middleware_1 = require("../middleware/auth-middleware");
var MessageApi = __importStar(require("../middleware/cloud-message-middleware"));
/** api request validator */
var MessageRequest = __importStar(require("../requests/cloud-message-request"));
var passport_1 = __importDefault(require("passport"));
/** Class representing Dashboard Simulated Route. */
var MessageAdminRoute = /** @class */ (function (_super) {
    __extends(MessageAdminRoute, _super);
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    function MessageAdminRoute(basePrefix) {
        var _this = _super.call(this, basePrefix) || this;
        _this.prefix += '/simulate';
        _this.preHandlers = [passport_1.default.authenticate('token', { session: false })];
        _this.setRoutes();
        return _this;
    }
    /**
     * Set the router's routes and middleware.
     */
    MessageAdminRoute.prototype.setRoutes = function () {
        /** Admin */
        this.router.post('/enter', auth_middleware_1.permissionAuth, MessageRequest.admin.simulateEnter, MessageApi.admin.simulateEnter);
        this.router.post('/exit', auth_middleware_1.permissionAuth, MessageRequest.admin.simulateExit, MessageApi.admin.simulateExit);
    };
    return MessageAdminRoute;
}(route_1.AdminRoute));
exports.MessageAdminRoute = MessageAdminRoute;
