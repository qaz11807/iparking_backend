import db, {paginate} from '../../models';
import {Request, Response} from 'express';
import UserInstance from '../../models/interfaces/user-interface';
import {Status} from '../../models/interfaces/order-interface';
import {ResponseStatus} from '../interfaces/response';

const Order = db.Order;
const Plate = db.Plate;
const User = db.User;

/** Normal User */

export namespace user {
    export const getLatestOrder = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const orders = await user.getOrders({
                order: [['id', 'DESC']],
                limit: 1,
            });
            const order = orders[0];
            res.json({
                status: ResponseStatus.Success,
                data: order,
            });
        } catch (error) {
            throw error;
        }
    };

    export const getAllOrders = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const pageSize = +req.query.pageSize!;
            const page = +req.query.page! - 1;
            const orders = await user.getOrders(
                paginate({page: page, pageSize: pageSize}, {order: [['id', 'DESC']], include: [Plate]}),
            );
            res.json({
                status: ResponseStatus.Success,
                data: orders,
            });
        } catch (error) {
            throw error;
        }
    };

    export const replyOrderChoice = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const orderId = req.params.id;
            const choice = req.body.choice;

            const orders = await user.getOrders({
                where: {id: orderId},
            });
            const order = orders[0];

            if (order == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Order not exist!',
                });
            } else {
                if (choice) {
                    const updatedOrder = await order.update({
                        status: Status.enter,
                        enterTime: new Date(),
                    });
                    res.json({
                        status: ResponseStatus.Success,
                        data: updatedOrder,
                    });
                } else {
                    await order.destroy();
                    res.json({
                        status: ResponseStatus.Success,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    export const deleteOrder = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const orderId = req.params.id;

            const orders = await user.getOrders({
                where: {id: orderId}, raw: true,
            });
            const order = orders[0];

            if (order == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Order not exist!',
                });
            } else {
                await order.destroy();
                res.json({
                    status: ResponseStatus.Success,
                });
            }
        } catch (error) {
            throw error;
        }
    };
}

/** Admin */

export namespace admin {
    export const createOrder = async (req:Request, res:Response) => {
        try {
            const payload = req.body;
            const user = await User.findOne({where: {id: payload.userId}});
            const mockOrder = {
                enterTime: new Date(),
                status: payload.status,
                PlateId: payload.plateId,
            };
            await user.createOrder(mockOrder);
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

    export const getAllOrders = async (req:Request, res:Response) => {
        try {
            const pageSize = +req.query.pageSize!;
            const page = +req.query.page! - 1;
            const order = await Order.findAll(
                paginate({page: page, pageSize: pageSize}),
            );
            res.json({
                status: ResponseStatus.Success,
                data: order,
            });
        } catch (error) {
            throw error;
        }
    };
}
