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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatedminRoute = exports.PlateRoute = void 0;
var route_1 = require("./route");
/** middleware imported */
var auth_middleware_1 = require("../middleware/auth-middleware");
var PlateApi = __importStar(require("../middleware/plate-middleware"));
/** api request validator */
var PlateRequest = __importStar(require("../requests/plate-request"));
/** Class representing Plate Route. */
var PlateRoute = /** @class */ (function (_super) {
    __extends(PlateRoute, _super);
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    function PlateRoute(basePrefix) {
        var _this = _super.call(this, basePrefix) || this;
        _this.prefix += '/plate';
        _this.setRoutes();
        return _this;
    }
    /**
     * Set the router's routes and middleware.
     */
    PlateRoute.prototype.setRoutes = function () {
        /** User */
        this.router.get('/', PlateRequest.user.getAllPlates, PlateApi.user.getAllPlates);
        this.router.post('/', PlateRequest.user.createPlate, PlateApi.user.createPlate);
        this.router.put('/', PlateRequest.user.updatePlate, PlateApi.user.updatePlate);
        this.router.delete('/', PlateRequest.user.deletePlate, PlateApi.user.deletePlate);
    };
    return PlateRoute;
}(route_1.AuthRoute));
exports.PlateRoute = PlateRoute;
/** Class representing Dashboard Plate Route. */
var PlatedminRoute = /** @class */ (function (_super) {
    __extends(PlatedminRoute, _super);
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    function PlatedminRoute(basePrefix) {
        var _this = _super.call(this, basePrefix) || this;
        _this.prefix += '/plate';
        _this.setRoutes();
        return _this;
    }
    /**
     * Set the router's routes and middleware.
     */
    PlatedminRoute.prototype.setRoutes = function () {
        this.router.get('/', auth_middleware_1.permissionAuth, PlateRequest.admin.getAllPlates, PlateApi.admin.getAllPlates);
        this.router.post('/', auth_middleware_1.permissionAuth, PlateRequest.admin.createPlate, PlateApi.admin.createPlate);
    };
    return PlatedminRoute;
}(route_1.AdminRoute));
exports.PlatedminRoute = PlatedminRoute;
