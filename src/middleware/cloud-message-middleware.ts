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
            if (!plate) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate Not Exist!',
                });
            }
            const user = await plate.getUser();
            if (!user) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'User Not Exist!',
                });
            }

            const mockOrder = {
                enterTime: new Date(),
                status: Status.pending,
                PlateId: plate.id,
            };
            const order = await user.createOrder(mockOrder);

            await sendMessage(enterMessage(user.deviceToken));

            res.send({
                status: ResponseStatus.Success,
                data: order.id,
            });
        } catch (error) {
            throw error;
        }
    };
    export const simulateExit = async (req:Request, res:Response) => {
        try {
            const payload = req.body;
            const plate = await Plate.findOne({where: {license: payload.license}});
            if (!plate) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'Plate Not Exist!',
                });
            }
            const user = await plate.getUser();
            if (!user) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'User Not Exist!',
                });
            }
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
