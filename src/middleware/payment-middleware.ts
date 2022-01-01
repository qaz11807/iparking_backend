import db from '../../models';
import {Request, Response} from 'express';

import UserInstance from '../../models/interfaces/user-interface';
import {Status} from '../../models/interfaces/order-interface';
import {ResponseStatus} from '../interfaces/response';

import {generatePayUrl} from '../utils/ecpay';
import {calcauteParkingPrice} from '../utils/calcuaute';
import {sendMessage} from '../utils/cloud-message-helper';
import {exitMessage} from '../utils/message-template';

/** Normal User */

export namespace user {
    export const getPayUrl = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const orderId = req.params.id;
            const orders = await user.getOrders({
                where: {
                    id: orderId,
                },
            });
            const order = orders[0];
            if (order == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Order not exist!',
                });
            } else {
                const price = calcauteParkingPrice(order.enterTime, new Date());
                const url = generatePayUrl(order.id, price);
                res.json({
                    status: ResponseStatus.Success,
                    data: url,
                });
            }
        } catch (error) {
            throw error;
        }
    };

    export const paidResultCallback = async (req:Request, res:Response) => {
        const {RtnCode, RtnMsg, MerchantTradeNo, TradeAmt} = req.body;
        const orderId = req.params.id;
        console.log(`order_id = ${orderId} , RtnCode = ${RtnCode} , RtnMsg = ${RtnMsg} , MerchantTradeNo = ${MerchantTradeNo}`);

        try {
            const order = await db.Order.findOne({
                where: {id: orderId},
            });

            if (order == null) {
                res.send('1');
                return;
            }

            const user = await order.getUser({
                raw: true,
            });

            const deviceToken: string = user.deviceToken;

            if (RtnCode === '1') {
                await order.update({
                    status: Status.exit,
                    exitTime: new Date(),
                    tradeAmount: TradeAmt,
                });

                await sendMessage(exitMessage(deviceToken));
            }

            const messagePaidResult = {
                data: {
                    paidResult: RtnCode,
                },
                token: deviceToken,
            };

            await sendMessage(messagePaidResult);
            res.send('1');
        } catch (err) {
            throw err;
        }
    };
}
