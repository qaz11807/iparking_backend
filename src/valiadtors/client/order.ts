import {param, query, body} from 'express-validator';

export default {
    getAll: [
        query('page').isNumeric().toInt().optional(),
        query('pageSize').isNumeric().toInt().optional(),
    ],
    replyOrder: [
        param('id').exists().toInt(),
        body('choice').exists().toBoolean(),
    ],
    delete: [
        param('id').exists().toInt(),
    ],
};
