"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    getAll: [
        (0, express_validator_1.query)('page').isNumeric().toInt().optional(),
        (0, express_validator_1.query)('pageSize').isNumeric().toInt().optional(),
    ],
    create: [
        (0, express_validator_1.body)('license').exists(),
    ],
    update: [
        (0, express_validator_1.param)('id').exists().toInt(),
        (0, express_validator_1.body)('license').exists(),
    ],
    delete: [
        (0, express_validator_1.param)('id').exists().toInt(),
    ],
};
