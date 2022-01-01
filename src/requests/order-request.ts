import {check} from 'express-validator';
import {showApiError} from '../middleware/validator-middleware';

/** User */
export namespace user{

    export const getAllOrders = [
        check('page').optional().toInt(),
        check('pageSize').optional().toInt(),
        showApiError,
    ];

    export const replyOrderChoice = [
        check('id').exists().toInt(),
        check('choice').exists().toBoolean(),
        showApiError,
    ];

    export const deleteOrder = [
        check('id').exists().toInt(),
        showApiError,
    ];
}

/** Admin */
export namespace admin{
    export const createOrder = [
        check('userId').exists().toInt(),
        check('plateId').exists().toInt(),
        check('status').exists(),
        showApiError,
    ];

    export const getAllOrders = [
        check('page').optional().toInt(),
        check('pageSize').optional().toInt(),
        showApiError,
    ];
}


