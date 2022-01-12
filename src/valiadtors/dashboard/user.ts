import {param, query, body} from 'express-validator';
import {RoleNames} from '../../../models/interfaces/role';

export default {
    get: [
        param('id').exists().toInt(),
    ],
    getAll: [
        query('page').toInt().optional(),
        query('pageSize').toInt().optional(),
    ],
    create: [
        body('username').exists().trim().escape().isLength({min: 4, max: 30}).isAlphanumeric(),
        body('password').exists().trim().notEmpty(),
        body('role').exists().isIn(RoleNames),
    ],
    update: [
        param('id').exists().toInt(),
        body('role').exists().isIn(RoleNames),
    ],
    delete: [
        param('id').exists().toInt(),
    ],
};

