import {check} from 'express-validator';
import {showApiError} from '../middleware/validator-middleware';

/** User */
export namespace user{
    export const updateDeviceToken = [
        check('token').exists(),
        showApiError,
    ];
}

