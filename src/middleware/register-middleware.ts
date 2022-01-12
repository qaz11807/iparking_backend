import bcrypt from 'bcrypt';
import db from '../../models';
import {Role} from '../../models/interfaces/role';

import {Request, Response} from 'express';
import {ResponseStatus} from '../interfaces/response';

const User = db.User;

interface User {
    username:string;
    password:string;
    role:Role;
}

export const checkUserIsExist = async (username:string) : Promise<boolean> => {
    try {
        const user = await User.findOne({where: {username}});
        return user !== null;
    } catch (err) {
        throw err;
    }
};

export const registerUser = async (req:Request, res:Response) => {
    try {
        const payload = req.body;
        const user : User= {
            username: payload.username,
            password: payload.password,
            role: Role.user,
        };
        const isExist = await checkUserIsExist(user.username);
        if (isExist) {
            res.json({
                status: ResponseStatus.Failed,
                error: 'User already exist !',
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            await User.create({...user, password: hash});
            res.json({
                status: ResponseStatus.Success,
            });
        }
    } catch (error) {
        throw error;
    }
};

export const registerUserWithRole = async (req:Request, res:Response) => {
    try {
        const payload = req.body;
        const user : User= {
            username: payload.username,
            password: payload.password,
            role: payload.role,
        };
        const isExist = await checkUserIsExist(user.username);
        if (isExist) {
            res.json({
                status: ResponseStatus.Failed,
                error: 'User already exist !',
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(user.password, salt);
            await User.create({...user, password: hash});
            res.json({
                status: ResponseStatus.Success,
            });
        }
    } catch (error) {
        throw error;
    }
};
