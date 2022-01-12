import {param, query, body} from 'express-validator';

export default {
    get: [
        param('id').exists().toInt(),
    ],
    getAll: [
        query('page').isNumeric().toInt().optional(),
        query('pageSize').isNumeric().toInt().optional(),
    ],
    create: [
        body('license').exists(),
        body('User.username').trim().escape().optional(),
    ],
    update: [
        param('id').exists().toInt(),
        body('license').exists(),
        body('User.username').trim().escape().optional(),
    ],
    delete: [
        param('id').exists().toInt(),
    ],
};
