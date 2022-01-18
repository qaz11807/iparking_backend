import db, {paginate} from '../../models';
import {Request, Response} from 'express';
import UserInstance from '../../models/interfaces/user-interface';
import {Status} from '../../models/interfaces/order-interface';
import {ResponseStatus} from '../interfaces/response';
const Order = db.Order;
const Plate = db.Plate;
const User = db.User;
// const sequelize = db.sequelize;
/** Normal User */

export namespace user {
    export const getLatestOrder = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const orders = await user.getOrders({
                attributes: [
                    'id', 'enterTime', 'exitTime', 'status', 'tradeAmount',
                ],
                include: {
                    model: Plate,
                    attributes: ['license'],
                },
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
            const page = +req.query.page!;
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

    export const getCount = async (req:Request, res:Response) => {
        try {
            const count = await Order.count();
            res.json({
                status: ResponseStatus.Success,
                data: count,
            });
        } catch (error) {
            throw error;
        }
    };

    export const getOrder = async (req:Request, res:Response) => {
        try {
            const order = await Order.findOne({
                where: {id: req.params.id},
                attributes: [
                    'id', 'enterTime', 'exitTime', 'status', 'tradeAmount',
                ],
                include: [
                    {
                        model: Plate,
                        attributes: ['license'],
                    },
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            });
            if (order == null) {
                return res.json({
                    status: ResponseStatus.Failed,
                    error: 'Order not Exist !',
                });
            }
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
            const pageSize = +req.query.pageSize!;
            const page = +req.query.page!;
            const order = await Order.findAll(
                paginate({page: page, pageSize: pageSize}, {
                    attributes: [
                        'id', 'enterTime', 'exitTime', 'status', 'tradeAmount',
                        // [sequelize.literal('"Plate"."license"'), 'licnese'],
                    ],
                    include: [
                        {
                            model: Plate,
                            attributes: ['license'],
                        },
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
                }),
            );
            res.json({
                status: ResponseStatus.Success,
                data: order,
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    export const createOrder = async (req:Request, res:Response) => {
        try {
            const payload = req.body;

            let plateId;
            let userId;

            if (payload.Plate) {
                const plate = await Plate.findOne({where: {license: payload.Plate.license}});
                if (!plate) {
                    return res.json({
                        status: ResponseStatus.Failed,
                        error: 'Plate Not Exist!',
                    });
                }
                plateId = plate.id;
                const user = await plate.getUser();
                if (!user) {
                    return res.json({
                        status: ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }
            const created = {
                enterTime: payload.enterTime,
                exiTime: payload.exiTime,
                status: payload.status,
                tradeAmount: payload.tradeAmount,
                PlateId: plateId,
                UserId: userId,
            };
            await Order.create(created);
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

    export const updateOrder = async (req:Request, res:Response) => {
        try {
            const payload = req.body;

            let plateId;
            let userId;

            if (payload.Plate) {
                const plate = await Plate.findOne({where: {license: payload.Plate.license}});
                if (!plate) {
                    return res.json({
                        status: ResponseStatus.Failed,
                        error: 'Plate Not Exist!',
                    });
                }
                plateId = plate.id;
                const user = await plate.getUser();
                if (!user) {
                    return res.json({
                        status: ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }
            const updated = {
                enterTime: payload.enterTime,
                exiTime: payload.exiTime,
                status: payload.status,
                tradeAmount: payload.tradeAmount,
                PlateId: plateId,
                UserId: userId,
            };
            await Order.update(updated, {where: {id: req.params.id}});
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

    export const deleteOrder = async (req:Request, res:Response) => {
        try {
            await Order.destroy({where: {id: req.params.id}});
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

}

