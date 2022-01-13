"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_validator_1 = require("express-validator");

exports["default"] = {
  getAll: [(0, express_validator_1.query)('page').isNumeric().toInt().optional(), (0, express_validator_1.query)('pageSize').isNumeric().toInt().optional()],
  replyOrder: [(0, express_validator_1.param)('id').exists().toInt(), (0, express_validator_1.body)('choice').exists().toBoolean()],
  "delete": [(0, express_validator_1.param)('id').exists().toInt()]
};