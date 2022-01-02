"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.user = void 0;
var express_validator_1 = require("express-validator");
var validator_middleware_1 = require("../middleware/validator-middleware");
/** User */
var user;
(function (user) {
    user.getAllOrders = [
        (0, express_validator_1.check)('page').optional().toInt(),
        (0, express_validator_1.check)('pageSize').optional().toInt(),
        validator_middleware_1.showApiError,
    ];
    user.replyOrderChoice = [
        (0, express_validator_1.check)('id').exists().toInt(),
        (0, express_validator_1.check)('choice').exists().toBoolean(),
        validator_middleware_1.showApiError,
    ];
    user.deleteOrder = [
        (0, express_validator_1.check)('id').exists().toInt(),
        validator_middleware_1.showApiError,
    ];
})(user = exports.user || (exports.user = {}));
/** Admin */
var admin;
(function (admin) {
    admin.createOrder = [
        (0, express_validator_1.check)('userId').exists().toInt(),
        (0, express_validator_1.check)('plateId').exists().toInt(),
        (0, express_validator_1.check)('status').exists(),
        validator_middleware_1.showApiError,
    ];
    admin.getAllOrders = [
        (0, express_validator_1.check)('page').optional().toInt(),
        (0, express_validator_1.check)('pageSize').optional().toInt(),
        validator_middleware_1.showApiError,
    ];
})(admin = exports.admin || (exports.admin = {}));
