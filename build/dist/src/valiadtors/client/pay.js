"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var express_validator_1 = require("express-validator");

exports["default"] = {
  getPayUrl: [(0, express_validator_1.param)('id').exists().toInt()]
};