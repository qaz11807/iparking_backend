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
exports.admin = void 0;
var models_1 = __importDefault(require("../../models"));
var order_interface_1 = require("../../models/interfaces/order-interface");
var response_1 = require("../interfaces/response");
var cloud_message_helper_1 = require("../utils/cloud-message-helper");
var message_template_1 = require("../utils/message-template");
var Plate = models_1.default.Plate;
/** Admin */
var admin;
(function (admin) {
    var _this = this;
    admin.simulateEnter = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var payload, plate, user, mockOrder, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    payload = req.body;
                    return [4 /*yield*/, Plate.findOne({ where: { license: payload.license } })];
                case 1:
                    plate = _a.sent();
                    return [4 /*yield*/, plate.getUser()];
                case 2:
                    user = _a.sent();
                    mockOrder = {
                        enterTime: new Date(),
                        status: order_interface_1.Status.enter,
                        PlateId: plate.id,
                    };
                    return [4 /*yield*/, user.createOrder(mockOrder)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, (0, cloud_message_helper_1.sendMessage)((0, message_template_1.enterMessage)(user.deviceToken))];
                case 4:
                    _a.sent();
                    res.send('OK');
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    throw error_1;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    admin.simulateExit = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var payload, plate, user, orders, order, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    payload = req.body;
                    return [4 /*yield*/, Plate.findOne({ where: { license: payload.license } })];
                case 1:
                    plate = _a.sent();
                    return [4 /*yield*/, plate.getUser()];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, user.getOrders({
                            where: {
                                status: order_interface_1.Status.exit,
                            },
                        })];
                case 3:
                    orders = _a.sent();
                    order = orders[0];
                    if (!(order == null)) return [3 /*break*/, 4];
                    res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'Order not Exist or Have not pay.',
                    });
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, order.update({
                        status: order_interface_1.Status.done,
                        exitTime: new Date(),
                    })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, cloud_message_helper_1.sendMessage)((0, message_template_1.doneMessage)(user.deviceToken))];
                case 6:
                    _a.sent();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                    });
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    throw error_2;
                case 9: return [2 /*return*/];
            }
        });
    }); };
})(admin = exports.admin || (exports.admin = {}));
