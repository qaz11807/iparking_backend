import {param, query, body} from 'express-validator';
import {StatusNames} from '../../../models/interfaces/order-interface';

export default {
    get: [
        param('id').exists().toInt(),
    ],
    getAll: [
        query('page').isNumeric().toInt().optional(),
        query('pageSize').isNumeric().toInt().optional(),
    ],
    create: [
        body('enterTime').exists().isISO8601().toDate(),
        body('exitTime').isISO8601().toDate().optional({nullable: true}),
        body('status').exists().isIn(StatusNames),
        body('tradeAmount').isNumeric().toInt().optional({nullable: true}),
        body('Plate.license').optional(),
    ],
    update: [
        param('id').exists().toInt(),
        body('enterTime').exists().isISO8601().toDate(),
        body('exitTime').isISO8601().toDate().optional({nullable: true}),
        body('status').exists().isIn(StatusNames),
        body('tradeAmount').isNumeric().toInt().optional({nullable: true}),
        body('Plate.license').optional(),
    ],
    delete: [
        param('id').exists().toInt(),
    ],
};
