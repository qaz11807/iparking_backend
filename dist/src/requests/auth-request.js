'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.loginRequest = void 0;
const express_validator_1 = require('express-validator');
const validator_middleware_1 = require('../middleware/validator-middleware');
exports.loginRequest = [
    (0, express_validator_1.check)('username').exists().isLength({min: 4}),
    (0, express_validator_1.check)('password').exists().isLength({min: 4}),
    validator_middleware_1.showApiError,
];
