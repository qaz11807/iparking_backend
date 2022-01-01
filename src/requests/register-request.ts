import {check} from 'express-validator';
import {showApiError} from '../middleware/validator-middleware';

export const registerRequest = [
    check('username').exists().isLength({min: 4}),
    check('password').exists().isLength({min: 4}),
    showApiError,
];
