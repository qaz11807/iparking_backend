"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUserWithRole = exports.registerUser = exports.checkUserIsExist = void 0;

var bcrypt_1 = __importDefault(require("bcrypt"));

var models_1 = __importDefault(require("../../models"));

var role_1 = require("../../models/interfaces/role");

var response_1 = require("../interfaces/response");

var User = models_1["default"].User;

var checkUserIsExist = function checkUserIsExist(username) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return User.findOne({
              where: {
                username: username
              }
            });

          case 3:
            user = _context.sent;
            return _context.abrupt("return", user !== null);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
};

exports.checkUserIsExist = checkUserIsExist;

var registerUser = function registerUser(req, res) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var payload, user, isExist, salt, hash;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            payload = req.body;
            user = {
              username: payload.username,
              password: payload.password,
              role: role_1.Role.user
            };
            _context2.next = 5;
            return (0, exports.checkUserIsExist)(user.username);

          case 5:
            isExist = _context2.sent;

            if (!isExist) {
              _context2.next = 10;
              break;
            }

            res.json({
              status: response_1.ResponseStatus.Failed,
              error: 'User already exist !'
            });
            _context2.next = 19;
            break;

          case 10:
            _context2.next = 12;
            return bcrypt_1["default"].genSalt(10);

          case 12:
            salt = _context2.sent;
            _context2.next = 15;
            return bcrypt_1["default"].hash(user.password, salt);

          case 15:
            hash = _context2.sent;
            _context2.next = 18;
            return User.create(Object.assign(Object.assign({}, user), {
              password: hash
            }));

          case 18:
            res.json({
              status: response_1.ResponseStatus.Success
            });

          case 19:
            _context2.next = 24;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](0);
            throw _context2.t0;

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 21]]);
  }));
};

exports.registerUser = registerUser;

var registerUserWithRole = function registerUserWithRole(req, res) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var payload, user, isExist, salt, hash;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            payload = req.body;
            user = {
              username: payload.username,
              password: payload.password,
              role: payload.role
            };
            _context3.next = 5;
            return (0, exports.checkUserIsExist)(user.username);

          case 5:
            isExist = _context3.sent;

            if (!isExist) {
              _context3.next = 10;
              break;
            }

            res.json({
              status: response_1.ResponseStatus.Failed,
              error: 'User already exist !'
            });
            _context3.next = 19;
            break;

          case 10:
            _context3.next = 12;
            return bcrypt_1["default"].genSalt(10);

          case 12:
            salt = _context3.sent;
            _context3.next = 15;
            return bcrypt_1["default"].hash(user.password, salt);

          case 15:
            hash = _context3.sent;
            _context3.next = 18;
            return User.create(Object.assign(Object.assign({}, user), {
              password: hash
            }));

          case 18:
            res.json({
              status: response_1.ResponseStatus.Success
            });

          case 19:
            _context3.next = 24;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](0);
            throw _context3.t0;

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 21]]);
  }));
};

exports.registerUserWithRole = registerUserWithRole;