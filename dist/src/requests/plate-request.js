"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.user = void 0;
var express_validator_1 = require("express-validator");
var validator_middleware_1 = require("../middleware/validator-middleware");
/** User */
var user;
(function (user) {
    user.createPlate = [
        (0, express_validator_1.check)('license').exists(),
        validator_middleware_1.showApiError,
    ];
    user.getAllPlates = [
        (0, express_validator_1.check)('page').optional().toInt(),
        (0, express_validator_1.check)('pageSize').optional().toInt(),
        validator_middleware_1.showApiError,
    ];
    user.updatePlate = [
        (0, express_validator_1.check)('id').exists().toInt(),
        (0, express_validator_1.check)('license').exists(),
        validator_middleware_1.showApiError,
    ];
    user.deletePlate = [
        (0, express_validator_1.check)('id').exists().toInt(),
        validator_middleware_1.showApiError,
    ];
})(user = exports.user || (exports.user = {}));
/** Admin */
var admin;
(function (admin) {
    admin.createPlate = [
        (0, express_validator_1.check)('userId').exists().toInt(),
        (0, express_validator_1.check)('plateId').exists().toInt(),
        validator_middleware_1.showApiError,
    ];
    admin.getAllPlates = [
        (0, express_validator_1.check)('page').optional().toInt(),
        (0, express_validator_1.check)('pageSize').optional().toInt(),
        validator_middleware_1.showApiError,
    ];
})(admin = exports.admin || (exports.admin = {}));
