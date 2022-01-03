"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var express_validator_1 = require("express-validator");
var validator_middleware_1 = require("../middleware/validator-middleware");
/** User */
var user;
(function (user) {
    user.getPayUrl = [
        (0, express_validator_1.check)('id').exists().toInt(),
        validator_middleware_1.showApiError,
    ];
})(user = exports.user || (exports.user = {}));