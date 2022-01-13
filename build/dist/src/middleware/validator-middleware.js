"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaGetter = exports.showApiError = void 0;

var express_validator_1 = require("express-validator");

var showApiError = function showApiError(req, res, next) {
  var errors = (0, express_validator_1.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

exports.showApiError = showApiError;

var schemaGetter = function schemaGetter(schemas) {
  return [].concat((0, _toConsumableArray2["default"])(schemas), [exports.showApiError]);
};

exports.schemaGetter = schemaGetter;