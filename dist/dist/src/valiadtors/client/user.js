"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    updateToken: [
        (0, express_validator_1.body)('token').exists(),
    ],
};
