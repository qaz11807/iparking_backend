"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_validator_1 = require("express-validator");

var role_1 = require("../../../models/interfaces/role");

exports["default"] = {
  get: [(0, express_validator_1.param)('id').exists().toInt()],
  getAll: [(0, express_validator_1.query)('page').toInt().optional(), (0, express_validator_1.query)('pageSize').toInt().optional()],
  create: [(0, express_validator_1.body)('username').exists().trim().escape().isLength({
    min: 4,
    max: 30
  }).isAlphanumeric(), (0, express_validator_1.body)('password').exists().trim().notEmpty(), (0, express_validator_1.body)('role').exists().isIn(role_1.RoleNames)],
  update: [(0, express_validator_1.param)('id').exists().toInt(), (0, express_validator_1.body)('role').exists().isIn(role_1.RoleNames)],
  "delete": [(0, express_validator_1.param)('id').exists().toInt()]
};