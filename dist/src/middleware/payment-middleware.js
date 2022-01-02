"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var models_1 = __importDefault(require("../../models"));
var order_interface_1 = require("../../models/interfaces/order-interface");
var response_1 = require("../interfaces/response");
var ecpay_1 = require("../utils/ecpay");
var calcuaute_1 = require("../utils/calcuaute");
var cloud_message_helper_1 = require("../utils/cloud-message-helper");
var message_template_1 = require("../utils/message-template");
/** Normal User */
var user;
(function (user_1) {
    var _this = this;
    user_1.getPayUrl = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user_2, orderId, orders, order, price, url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user_2 = req.user;
                    orderId = req.params.id;
                    return [4 /*yield*/, user_2.getOrders({
                            where: {
                                id: orderId,
                            },
                        })];
                case 1:
                    orders = _a.sent();
                    order = orders[0];
                    if (order == null) {
                        res.json({
                            status: response_1.ResponseStatus.Failed,
                            error: 'Order not exist!',
                        });
                    }
                    else {
                        price = (0, calcuaute_1.calcauteParkingPrice)(order.enterTime, new Date());
                        url = (0, ecpay_1.generatePayUrl)(order.id, price);
                        res.json({
                            status: response_1.ResponseStatus.Success,
                            data: url,
                        });
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    user_1.paidResultCallback = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, RtnCode, RtnMsg, MerchantTradeNo, TradeAmt, orderId, order, user_3, deviceToken, messagePaidResult, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, RtnCode = _a.RtnCode, RtnMsg = _a.RtnMsg, MerchantTradeNo = _a.MerchantTradeNo, TradeAmt = _a.TradeAmt;
                    orderId = req.params.id;
                    console.log("order_id = ".concat(orderId, " , RtnCode = ").concat(RtnCode, " , RtnMsg = ").concat(RtnMsg, " , MerchantTradeNo = ").concat(MerchantTradeNo));
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    return [4 /*yield*/, models_1.default.Order.findOne({
                            where: { id: orderId },
                        })];
                case 2:
                    order = _b.sent();
                    if (order == null) {
                        res.send('1');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, order.getUser({
                            raw: true,
                        })];
                case 3:
                    user_3 = _b.sent();
                    deviceToken = user_3.deviceToken;
                    if (!(RtnCode === '1')) return [3 /*break*/, 6];
                    return [4 /*yield*/, order.update({
                            status: order_interface_1.Status.exit,
                            exitTime: new Date(),
                            tradeAmount: TradeAmt,
                        })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (0, cloud_message_helper_1.sendMessage)((0, message_template_1.exitMessage)(deviceToken))];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6:
                    messagePaidResult = {
                        data: {
                            paidResult: RtnCode,
                        },
                        token: deviceToken,
                    };
                    return [4 /*yield*/, (0, cloud_message_helper_1.sendMessage)(messagePaidResult)];
                case 7:
                    _b.sent();
                    res.send('1');
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    throw err_1;
                case 9: return [2 /*return*/];
            }
        });
    }); };
})(user = exports.user || (exports.user = {}));
