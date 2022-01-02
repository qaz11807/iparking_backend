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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.user = void 0;
var models_1 = __importStar(require("../../models"));
var order_interface_1 = require("../../models/interfaces/order-interface");
var response_1 = require("../interfaces/response");
var Order = models_1.default.Order;
var Plate = models_1.default.Plate;
var User = models_1.default.User;
/** Normal User */
var user;
(function (user_1) {
    var _this = this;
    user_1.getLatestOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user_2, orders, order, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user_2 = req.user;
                    return [4 /*yield*/, user_2.getOrders({
                            order: [['id', 'DESC']],
                            limit: 1,
                        })];
                case 1:
                    orders = _a.sent();
                    order = orders[0];
                    res.json({
                        status: response_1.ResponseStatus.Success,
                        data: order,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    user_1.getAllOrders = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user_3, pageSize, page, orders, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user_3 = req.user;
                    pageSize = +req.query.pageSize;
                    page = +req.query.page - 1;
                    return [4 /*yield*/, user_3.getOrders((0, models_1.paginate)({ page: page, pageSize: pageSize }, { order: [['id', 'DESC']], include: [Plate] }))];
                case 1:
                    orders = _a.sent();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                        data: orders,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    user_1.replyOrderChoice = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user_4, orderId, choice, orders, order, updatedOrder, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    user_4 = req.user;
                    orderId = req.params.id;
                    choice = req.body.choice;
                    return [4 /*yield*/, user_4.getOrders({
                            where: { id: orderId },
                        })];
                case 1:
                    orders = _a.sent();
                    order = orders[0];
                    if (!(order == null)) return [3 /*break*/, 2];
                    res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'Order not exist!',
                    });
                    return [3 /*break*/, 6];
                case 2:
                    if (!choice) return [3 /*break*/, 4];
                    return [4 /*yield*/, order.update({
                            status: order_interface_1.Status.enter,
                            enterTime: new Date(),
                        })];
                case 3:
                    updatedOrder = _a.sent();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                        data: updatedOrder,
                    });
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, order.destroy()];
                case 5:
                    _a.sent();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                    });
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.log(error_3);
                    throw error_3;
                case 8: return [2 /*return*/];
            }
        });
    }); };
    user_1.deleteOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user_5, orderId, orders, order, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    user_5 = req.user;
                    orderId = req.params.id;
                    return [4 /*yield*/, user_5.getOrders({
                            where: { id: orderId }, raw: true,
                        })];
                case 1:
                    orders = _a.sent();
                    order = orders[0];
                    if (!(order == null)) return [3 /*break*/, 2];
                    res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'Order not exist!',
                    });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, order.destroy()];
                case 3:
                    _a.sent();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                    });
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    throw error_4;
                case 6: return [2 /*return*/];
            }
        });
    }); };
})(user = exports.user || (exports.user = {}));
/** Admin */
var admin;
(function (admin) {
    var _this = this;
    admin.createOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var payload, user_6, mockOrder, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    payload = req.body;
                    return [4 /*yield*/, User.findOne({ where: { id: payload.userId } })];
                case 1:
                    user_6 = _a.sent();
                    mockOrder = {
                        enterTime: new Date(),
                        status: payload.status,
                        PlateId: payload.plateId,
                    };
                    return [4 /*yield*/, user_6.createOrder(mockOrder)];
                case 2:
                    _a.sent();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    throw error_5;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    admin.getAllOrders = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var pageSize, page, order, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    pageSize = +req.query.pageSize;
                    page = +req.query.page - 1;
                    return [4 /*yield*/, Order.findAll((0, models_1.paginate)({ page: page, pageSize: pageSize }))];
                case 1:
                    order = _a.sent();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                        data: order,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    throw error_6;
                case 3: return [2 /*return*/];
            }
        });
    }); };
})(admin = exports.admin || (exports.admin = {}));
