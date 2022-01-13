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
exports.signin = exports.permissionAuth = void 0;

var bcrypt_1 = __importDefault(require("bcrypt"));

var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));

var passport_1 = __importDefault(require("passport"));

var passport_jwt_1 = __importDefault(require("passport-jwt"));

var passport_local_1 = require("passport-local");

var models_1 = __importDefault(require("../../models"));

var role_1 = require("../../models/interfaces/role");

var config_1 = __importDefault(require("../../config"));

var JWTStrategy = passport_jwt_1["default"].Strategy;
var extractJWT = passport_jwt_1["default"].ExtractJwt;
var secretKey = config_1["default"].jwtSecret;
var User = models_1["default"].User;

var checkPassword = function checkPassword(user, password) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return bcrypt_1["default"].compare(password, user.password);

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw _context.t0;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
};

passport_1["default"].use('signin', new passport_local_1.Strategy(function (username, password, done) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var isValid, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            isValid = false;
            _context2.next = 4;
            return User.findOne({
              where: {
                username: username
              },
              raw: true
            });

          case 4:
            user = _context2.sent;

            if (!(user !== null)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 8;
            return checkPassword(user, password);

          case 8:
            isValid = _context2.sent;

          case 9:
            if (isValid) {
              done(null, user, {
                message: '登入成功'
              });
            } else {
              done(null, null);
            }

            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            done(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));
}));
passport_1["default"].use('token', new JWTStrategy({
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
}, function (jwtPayload, done) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return User.findByPk(jwtPayload.id);

          case 3:
            user = _context3.sent;
            done(null, user);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            done(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
}));

var permissionAuth = function permissionAuth(req, res, next) {
  var isAllowed = false;

  if (req.user !== undefined) {
    var user = req.user;
    isAllowed = user.role === role_1.Role.admin;
  }

  if (isAllowed) {
    next();
  } else {
    return res.status(401).send('unauthorized');
  }
};

exports.permissionAuth = permissionAuth;

var signin = function signin(req, res) {
  try {
    if (req.user !== undefined) {
      var token = jsonwebtoken_1["default"].sign(req.user, secretKey);
      res.json(token);
    }
  } catch (error) {
    throw error;
  }
};

exports.signin = signin;