"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePayUrl = void 0;
const date_helper_1 = require("./date-helper");
const config_1 = __importDefault(require("../../config"));
const Ecpaypayment = require('ecpay-payment');
const create = new Ecpaypayment();
const generateTradeUID = () => {
    const a = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let r = '';
    for (let i = 0; i < 20; i++) {
        r += a[Math.floor(Math.random() * a.length)];
    }
    return r;
};
const initParm = (orderId, price) => {
    return {
        MerchantTradeNo: generateTradeUID(),
        MerchantTradeDate: (0, date_helper_1.generateFormatedDate)(new Date()),
        TotalAmount: price.toString(),
        TradeDesc: '這是一筆信用卡繳費測試',
        ItemName: '停車場繳費',
        ReturnURL: `${config_1.default.url}/pay/callback/${orderId}`,
    };
};
const generatePayUrl = (orderId, price) => {
    const param = initParm(orderId, price);
    console.log(param);
    return create.payment_client.aio_check_out_credit_onetime(param);
};
exports.generatePayUrl = generatePayUrl;
