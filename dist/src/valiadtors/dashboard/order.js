"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const order_interface_1 = require("../../../models/interfaces/order-interface");
exports.default = {
    get: [
        (0, express_validator_1.param)('id').exists().toInt(),
    ],
    getAll: [
        (0, express_validator_1.query)('page').isNumeric().toInt().optional(),
        (0, express_validator_1.query)('pageSize').isNumeric().toInt().optional(),
    ],
    create: [
        (0, express_validator_1.body)('enterTime').exists().isISO8601().toDate(),
        (0, express_validator_1.body)('exitTime').isISO8601().toDate().optional({ nullable: true }),
        (0, express_validator_1.body)('status').exists().isIn(order_interface_1.StatusNames),
        (0, express_validator_1.body)('tradeAmount').isNumeric().toInt().optional({ nullable: true }),
        (0, express_validator_1.body)('Plate.license').optional(),
    ],
    update: [
        (0, express_validator_1.param)('id').exists().toInt(),
        (0, express_validator_1.body)('enterTime').exists().isISO8601().toDate(),
        (0, express_validator_1.body)('exitTime').isISO8601().toDate().optional({ nullable: true }),
        (0, express_validator_1.body)('status').exists().isIn(order_interface_1.StatusNames),
        (0, express_validator_1.body)('tradeAmount').isNumeric().toInt().optional({ nullable: true }),
        (0, express_validator_1.body)('Plate.license').optional(),
    ],
    delete: [
        (0, express_validator_1.param)('id').exists().toInt(),
    ],
};
