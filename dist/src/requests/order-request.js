'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.createOrderRequest = void 0;
const express_validator_1 = require('express-validator');
const validator_middleware_1 = require('../middleware/validator-middleware');
exports.createOrderRequest = [
    (0, express_validator_1.check)('licenseId').exists().toInt(),
    validator_middleware_1.showApiError,
];
