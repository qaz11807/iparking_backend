import {body} from 'express-validator';

export default {
    login: [
        body('username').exists().trim().escape().isLength({min: 4, max: 30}).isAlphanumeric(),
        body('password').exists().trim().notEmpty(),
    ],
    register: [
        body('username').exists().trim().escape().isLength({min: 4, max: 30}).isAlphanumeric(),
        body('password').exists().trim().notEmpty(),
    ],
};
