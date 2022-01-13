"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_validator_1 = require("express-validator");

exports["default"] = {
  get: [(0, express_validator_1.param)('id').exists().toInt()],
  getAll: [(0, express_validator_1.query)('page').isNumeric().toInt().optional(), (0, express_validator_1.query)('pageSize').isNumeric().toInt().optional()],
  create: [(0, express_validator_1.body)('license').exists(), (0, express_validator_1.body)('User.username').trim().escape().optional()],
  update: [(0, express_validator_1.param)('id').exists().toInt(), (0, express_validator_1.body)('license').exists(), (0, express_validator_1.body)('User.username').trim().escape().optional()],
  "delete": [(0, express_validator_1.param)('id').exists().toInt()]
};