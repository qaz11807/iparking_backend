"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_validator_1 = require("express-validator");

exports["default"] = {
  login: [(0, express_validator_1.body)('username').exists().trim().escape().isLength({
    min: 4,
    max: 30
  }).isAlphanumeric(), (0, express_validator_1.body)('password').exists().trim().notEmpty()],
  register: [(0, express_validator_1.body)('username').exists().trim().escape().isLength({
    min: 4,
    max: 30
  }).isAlphanumeric(), (0, express_validator_1.body)('password').exists().trim().notEmpty()]
};