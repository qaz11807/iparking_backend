import UserInstance from '../../models/interfaces/user-interface';

import {Request, Response} from 'express';
import {ResponseStatus} from '../interfaces/response';

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
