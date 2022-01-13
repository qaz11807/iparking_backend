"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = {
    simulateEnter: [
        (0, express_validator_1.body)('license').exists(),
    ],
    simulateExit: [
        (0, express_validator_1.body)('license').exists(),
    ],
};
