import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import {Strategy} from 'passport-local';

import db from '../../models';
import UserInstance from '../../models/interfaces/user-interface';
import {Role} from '../../models/interfaces/role';

import {Request, Response, NextFunction} from 'express';

const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const secretKey = 'kldxnflkdzsfrfa';

const User = db.User;

const checkPassword = async (user:UserInstance, password:string) : Promise<boolean> => {
    try {
        return await bcrypt.compare(password, user.password);
    } catch (err) {
        throw err;
    }
};

passport.use('signin', new Strategy(async (username, password, done) => {
    try {
        let isValid = false;
        const user = await User.findOne({where: {username}, raw: true});
        if (user !== null) {
            isValid = await checkPassword(user, password);
        }
        if (isValid) {
            done(null, user);
        } else {
            done(new Error('Compare password failed!'), false);
        }
    } catch (err) {
        done(err, false);
    }
}));

passport.use('token',
    new JWTStrategy({
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey,
    },
    async (jwtPayload, done) => {
        try {
            const user = await User.findByPk(jwtPayload.id);
            if (user !== null) {
                done(null, user);
            } else {
                done(new Error('Can not find user by id !'));
            }
        } catch (err) {
            done(err);
        }
    }),
);

export const permissionAuth = (req:Request, res:Response, next: NextFunction) => {
    let isAllowed = false;
    if (req.user !== undefined ) {
        const user = req.user as UserInstance;
        isAllowed = user.role === Role.admin;
    }

    if (isAllowed) {
        next();
    } else {
        return res.status(401).send('unauthorized');
    }
};

export const signin = (req:Request, res:Response) => {
    try {
        if (req.user !== undefined) {
            const token = jwt.sign(req.user, secretKey);
            res.json(token);
        }
    } catch (error) {
        throw error;
    }
};
