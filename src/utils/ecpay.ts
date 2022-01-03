import {generateFormatedDate} from './date-helper';
import config from '../../config';

const Ecpaypayment = require('ecpay-payment');

const create = new Ecpaypayment();

const generateTradeUID = ()=>{
    const a = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let r = '';
    for (let i=0; i<20; i++) {
        r += a[Math.floor(Math.random()*a.length)];
    }
    return r;
};

const initParm = (orderId: number, price: number) => {
    return {
        MerchantTradeNo: generateTradeUID(),
        MerchantTradeDate: generateFormatedDate(new Date()),
        TotalAmount: price.toString(),
        TradeDesc: '這是一筆信用卡繳費測試',
        ItemName: '停車場繳費',
        ReturnURL: `${config.url}/pay/callback/${orderId}`,
    };
};

export const generatePayUrl = (orderId: number, price: number) => {
    const param = initParm(orderId, price);
    console.log(param);
    return create.payment_client.aio_check_out_credit_onetime(param);
};
