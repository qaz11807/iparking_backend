import db from '../../models';
import {Request, Response} from 'express';
import {Status} from '../../models/interfaces/order-interface';
import {ResponseStatus} from '../interfaces/response';
import {sendMessage} from '../utils/cloud-message-helper';
import {doneMessage, enterMessage} from '../utils/message-template';

const Plate = db.Plate;

/** Admin */

export namespace admin {
    export const simulateEnter = async (req:Request, res:Response) => {
        try {
            const payload = req.body;
            const plate = await Plate.findOne({where: {license: payload.license}});
            const user = await plate.getUser();

            const mockOrder = {
                enterTime: new Date(),
                status: Status.enter,
                PlateId: plate.id,
            };
            await user.createOrder(mockOrder);

            await sendMessage(enterMessage(user.deviceToken));

            res.send('OK');
        } catch (error) {
            throw error;
        }
    };

    export const simulateExit = async (req:Request, res:Response) => {
        try {
            const payload = req.body;
            const plate = await Plate.findOne({where: {license: payload.license}});
            const user = await plate.getUser();

            const orders = await user.getOrders({
                where: {
                    status: Status.exit,
                },
            });

            const order = orders[0];

            if (order == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Order not Exist or Have not pay.',
                });
            } else {
                await order.update({
                    status: Status.done,
                    exitTime: new Date(),
                });

                await sendMessage(doneMessage(user.deviceToken));

                res.json({
                    status: ResponseStatus.Success,
                });
            }
        } catch (error) {
            throw error;
        }
    };
}
