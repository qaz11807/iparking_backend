"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
var express_validator_1 = require("express-validator");
var validator_middleware_1 = require("../middleware/validator-middleware");
/** Admin */
var admin;
(function (admin) {
    admin.simulateEnter = [
        (0, express_validator_1.check)('license').exists(),
        validator_middleware_1.showApiError,
    ];
    admin.simulateExit = [
        (0, express_validator_1.check)('license').exists(),
        validator_middleware_1.showApiError,
    ];
})(admin = exports.admin || (exports.admin = {}));
