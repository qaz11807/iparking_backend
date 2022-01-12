import {param, query, body} from 'express-validator';

export default {
    getAll: [
        query('page').isNumeric().toInt().optional(),
        query('pageSize').isNumeric().toInt().optional(),
    ],
    create: [
        body('license').exists(),
    ],
    update: [
        param('id').exists().toInt(),
        body('license').exists(),
    ],
    delete: [
        param('id').exists().toInt(),
    ],
};
