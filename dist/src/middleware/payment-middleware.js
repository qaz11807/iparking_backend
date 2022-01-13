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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const models_1 = __importDefault(require("../../models"));
const order_interface_1 = require("../../models/interfaces/order-interface");
const response_1 = require("../interfaces/response");
const ecpay_1 = require("../utils/ecpay");
const calcuaute_1 = require("../utils/calcuaute");
const cloud_message_helper_1 = require("../utils/cloud-message-helper");
const message_template_1 = require("../utils/message-template");
/** Normal User */
var user;
(function (user_1) {
    user_1.getPayUrl = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const orderId = req.params.id;
            const orders = yield user.getOrders({
                where: {
                    id: orderId,
                },
            });
            const order = orders[0];
            if (order == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Order not exist!',
                });
            }
            else {
                const price = (0, calcuaute_1.calcauteParkingPrice)(order.enterTime, new Date());
                const url = (0, ecpay_1.generatePayUrl)(order.id, price);
                res.json({
                    status: response_1.ResponseStatus.Success,
                    data: url,
                });
            }
        }
        catch (error) {
            throw error;
        }
    });
    user_1.paidResultCallback = (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { RtnCode, RtnMsg, MerchantTradeNo, TradeAmt } = req.body;
        const orderId = req.params.id;
        console.log(`order_id = ${orderId} , RtnCode = ${RtnCode} , RtnMsg = ${RtnMsg} , MerchantTradeNo = ${MerchantTradeNo}`);
        try {
            const order = yield models_1.default.Order.findOne({
                where: { id: orderId },
            });
            if (order == null) {
                res.send('1');
                return;
            }
            const user = yield order.getUser({
                raw: true,
            });
            const deviceToken = user.deviceToken;
            if (RtnCode === '1') {
                yield order.update({
                    status: order_interface_1.Status.exit,
                    exitTime: new Date(),
                    tradeAmount: TradeAmt,
                });
                yield (0, cloud_message_helper_1.sendMessage)((0, message_template_1.exitMessage)(deviceToken));
            }
            const messagePaidResult = {
                data: {
                    paidResult: RtnCode,
                },
                token: deviceToken,
            };
            yield (0, cloud_message_helper_1.sendMessage)(messagePaidResult);
            res.send('1');
        }
        catch (err) {
            throw err;
        }
    });
})(user = exports.user || (exports.user = {}));
