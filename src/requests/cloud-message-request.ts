import {check} from 'express-validator';
import {showApiError} from '../middleware/validator-middleware';

/** Admin */
export namespace admin{
    export const simulateEnter = [
        check('license').exists(),
        showApiError,
    ];

    export const simulateExit = [
        check('license').exists(),
        showApiError,
    ];
}


