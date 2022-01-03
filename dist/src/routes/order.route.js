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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderAdminRoute = exports.OrderRoute = void 0;
var route_1 = require("./route");
/** middleware imported */
var OrderApi = __importStar(require("../middleware/order-middleware"));
/** api request validator */
var OrderRequest = __importStar(require("../requests/order-request"));
/** Class representing Order Route. */
var OrderRoute = /** @class */ (function (_super) {
    __extends(OrderRoute, _super);
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    function OrderRoute(basePrefix) {
        var _this = _super.call(this, basePrefix) || this;
        _this.prefix += '/order';
        _this.preHandlers = __spreadArray([], _this.preHandlers, true);
        _this.setRoutes();
        return _this;
    }
    /**
     * Set the router's routes and middleware.
     */
    OrderRoute.prototype.setRoutes = function () {
        this.router.get('/', OrderRequest.user.getAllOrders, OrderApi.user.getAllOrders);
        this.router.get('/latest', OrderApi.user.getLatestOrder);
        this.router.put('/:id', OrderRequest.user.replyOrderChoice, OrderApi.user.replyOrderChoice);
        this.router.delete('/:id', OrderRequest.user.deleteOrder, OrderApi.user.deleteOrder);
    };
    return OrderRoute;
}(route_1.AuthRoute));
exports.OrderRoute = OrderRoute;
/** */
var OrderAdminRoute = /** @class */ (function (_super) {
    __extends(OrderAdminRoute, _super);
    /**
     * Create a routes.
     * @param {string} basePrefix
     */
    function OrderAdminRoute(basePrefix) {
        var _this = _super.call(this, basePrefix) || this;
        _this.prefix += '/order';
        _this.preHandlers = __spreadArray([], _this.preHandlers, true);
        _this.setRoutes();
        return _this;
    }
    /**
     * Set the router's routes and middleware.
     */
    OrderAdminRoute.prototype.setRoutes = function () {
        this.router.get('/', OrderRequest.admin.getAllOrders, OrderApi.admin.getAllOrders);
        this.router.post('/', OrderRequest.admin.createOrder, OrderApi.admin.createOrder);
    };
    return OrderAdminRoute;
}(route_1.AdminRoute));
exports.OrderAdminRoute = OrderAdminRoute;
