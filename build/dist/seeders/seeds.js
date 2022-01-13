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

var models_1 = __importDefault(require("../models"));

var bcrypt_1 = __importDefault(require("bcrypt"));

var role_1 = require("../models/interfaces/role");

(function () {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var userDatas, salt, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return models_1["default"].sequelize.sync();

          case 3:
            userDatas = [{
              username: 'admin',
              password: '1234',
              role: role_1.Role.admin
            }, {
              username: 'test',
              password: '1234',
              role: role_1.Role.user
            }];
            _context2.next = 6;
            return bcrypt_1["default"].genSalt(10);

          case 6:
            salt = _context2.sent;
            response = userDatas.map(function (user) {
              return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                var hash;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return bcrypt_1["default"].hash(user.password, salt);

                      case 2:
                        hash = _context.sent;
                        _context.next = 5;
                        return models_1["default"].User.findOrCreate({
                          where: {
                            username: user.username
                          },
                          defaults: Object.assign(Object.assign({}, user), {
                            password: hash
                          })
                        });

                      case 5:
                        return _context.abrupt("return", _context.sent);

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
            });
            _context2.next = 10;
            return Promise.all(response);

          case 10:
            console.log(response);
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            throw _context2.t0;

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));
})();