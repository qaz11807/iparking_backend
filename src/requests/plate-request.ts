import {check} from 'express-validator';
import {showApiError} from '../middleware/validator-middleware';

/** User */
export namespace user{
    export const createPlate = [
        check('license').exists(),
        showApiError,
    ];

    export const getAllPlates = [
        check('page').optional().toInt(),
        check('pageSize').optional().toInt(),
        showApiError,
    ];

    export const updatePlate = [
        check('id').exists().toInt(),
        check('license').exists(),
        showApiError,
    ];

    export const deletePlate = [
        check('id').exists().toInt(),
        showApiError,
    ];

}

/** Admin */
export namespace admin{
    export const createPlate = [
        check('userId').exists().toInt(),
        check('plateId').exists().toInt(),
        showApiError,
    ];

    export const getAllPlates = [
        check('page').optional().toInt(),
        check('pageSize').optional().toInt(),
        showApiError,
    ];
}

