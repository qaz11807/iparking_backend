"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePayUrl = void 0;
var date_helper_1 = require("./date-helper");
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
        ReturnURL: "https://8c4b-111-255-87-170.ngrok.io/pay/callback/".concat(orderId),
    };
};
var generatePayUrl = function (orderId, price) {
    var param = initParm(orderId, price);
    console.log(param);
    return create.payment_client.aio_check_out_credit_onetime(param);
};
exports.generatePayUrl = generatePayUrl;
