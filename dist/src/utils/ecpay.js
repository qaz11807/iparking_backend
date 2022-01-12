"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePayUrl = void 0;
var date_helper_1 = require("./date-helper");
var config_1 = __importDefault(require("../../config"));
var Ecpaypayment = require('ecpay-payment');
var create = new Ecpaypayment();
var generateTradeUID = function () {
    var a = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var r = '';
    for (var i = 0; i < 20; i++) {
        r += a[Math.floor(Math.random() * a.length)];
    }
    return r;
};
var initParm = function (orderId, price) {
    return {
        MerchantTradeNo: generateTradeUID(),
        MerchantTradeDate: (0, date_helper_1.generateFormatedDate)(new Date()),
        TotalAmount: price.toString(),
        TradeDesc: '這是一筆信用卡繳費測試',
        ItemName: '停車場繳費',
        ReturnURL: "".concat(config_1.default.url, "/pay/callback/").concat(orderId),
    };
};
var generatePayUrl = function (orderId, price) {
    var param = initParm(orderId, price);
    console.log(param);
    return create.payment_client.aio_check_out_credit_onetime(param);
};
exports.generatePayUrl = generatePayUrl;
