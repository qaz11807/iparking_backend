import UserInstance from '../../models/interfaces/user-interface';

import {Request, Response} from 'express';
import {ResponseStatus} from '../interfaces/response';
import db, {paginate} from '../../models';
import {Role} from '../../models/interfaces/role';

const User = db.User;
export namespace user{
    export const updateDeviceToken = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;
            const token = req.body.token;
            await user.update({
                deviceToken: token,
            });
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };
}

/** Admin */

export namespace admin {
    export const getCount = async (req:Request, res:Response) => {
        try {
            const count = await User.count();
            res.json({
                status: ResponseStatus.Success,
                data: count,
            });
        } catch (error) {
            throw error;
        }
    };

    export const getSelf = async (req:Request, res:Response) => {
        try {
            const user = req.user as UserInstance;

            res.json({
                status: ResponseStatus.Success,
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
            });
        } catch (error) {
            throw error;
        }
    };

    export const getUser = async (req:Request, res:Response) => {
        try {
            const user = await User.findOne({
                where: {id: req.params.id},
                attributes: [
                    'id', 'username', 'role',
                ],
            });
            if (user == null) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'User not Exist !',
                });
            }
            res.json({
                status: ResponseStatus.Success,
                data: user,
            });
        } catch (error) {
            throw error;
        }
    };

    export const getAllUsers = async (req:Request, res:Response) => {
        try {
            const pageSize = +req.query.pageSize!;
            const page = +req.query.page! - 1;
            const user = await User.findAll(
                paginate({page: page, pageSize: pageSize}, {
                    attributes: [
                        'id', 'username', 'role',
                    ],
                }),
            );
            res.json({
                status: ResponseStatus.Success,
                data: user,
            });
        } catch (error) {
            throw error;
        }
    };

    export const updateUser = async (req:Request, res:Response) => {
        try {
            const payload = req.body;
            if (!(payload.role in Role)) {
                res.json({
                    status: ResponseStatus.Failed,
                    error: 'Role Not Exist!',
                });
            }
            const updated = {
                role: payload.role,
            };
            await User.update(updated, {where: {id: req.params.id}});
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

    export const deleteOrder = async (req:Request, res:Response) => {
        try {
            await User.destroy({where: {id: req.params.id}});
            res.json({
                status: ResponseStatus.Success,
            });
        } catch (error) {
            throw error;
        }
    };

}


