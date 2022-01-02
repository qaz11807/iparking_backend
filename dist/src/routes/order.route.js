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
var route_1 = __importDefault(require("./route"));
/** middleware imported */
var auth_middleware_1 = require("../middleware/auth-middleware");
var OrderApi = __importStar(require("../middleware/order-middleware"));
/** api request validator */
var OrderRequest = __importStar(require("../requests/order-request"));
/** Class representing Order Route. */
var OrderRoute = /** @class */ (function (_super) {
    __extends(OrderRoute, _super);
    /**
     * Create a routes.
     */
    function OrderRoute() {
        var _this = _super.call(this) || this;
        _this.prefix = '/order';
        _this.auth = true;
        _this.setRoutes();
        return _this;
    }
    /**
     * Set the router's routes and middleware.
     */
    OrderRoute.prototype.setRoutes = function () {
        /** User */
        this.router.get('/', OrderRequest.user.getAllOrders, OrderApi.user.getAllOrders);
        this.router.get('/latest', OrderApi.user.getLatestOrder);
        this.router.put('/:id', OrderRequest.user.replyOrderChoice, OrderApi.user.replyOrderChoice);
        this.router.delete('/:id', OrderRequest.user.deleteOrder, OrderApi.user.deleteOrder);
        /** Admin */
        this.router.get('/admin', auth_middleware_1.permissionAuth, OrderRequest.admin.getAllOrders, OrderApi.admin.getAllOrders);
        this.router.post('/admin', auth_middleware_1.permissionAuth, OrderRequest.admin.createOrder, OrderApi.admin.createOrder);
    };
    return OrderRoute;
}(route_1.default));
exports.default = OrderRoute;
