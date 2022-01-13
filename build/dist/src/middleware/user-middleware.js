"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = void 0 && (void 0).__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.admin = exports.user = void 0;

var response_1 = require("../interfaces/response");

var models_1 = __importStar(require("../../models"));

var role_1 = require("../../models/interfaces/role");

var User = models_1["default"].User;
var user;

(function (user_1) {
  var _this = this;

  user_1.updateDeviceToken = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _user, token;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _user = req.user;
              token = req.body.token;
              _context.next = 5;
              return _user.update({
                deviceToken: token
              });

            case 5:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 8]]);
    }));
  };
})(user = exports.user || (exports.user = {}));
/** Admin */


var admin;

(function (admin) {
  var _this2 = this;

  admin.getCount = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var count;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return User.count();

            case 3:
              count = _context2.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: count
              });
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));
  };

  admin.getSelf = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _user2;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _user2 = req.user;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: {
                  id: _user2.id,
                  username: _user2.username,
                  role: _user2.role
                }
              });
              _context3.next = 8;
              break;

            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 5]]);
    }));
  };

  admin.getUser = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _user3;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return User.findOne({
                where: {
                  id: req.params.id
                },
                attributes: ['id', 'username', 'role']
              });

            case 3:
              _user3 = _context4.sent;

              if (_user3 == null) {
                res.json({
                  status: response_1.ResponseStatus.Failed,
                  error: 'User not Exist !'
                });
              }

              res.json({
                status: response_1.ResponseStatus.Success,
                data: _user3
              });
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }));
  };

  admin.getAllUsers = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var pageSize, page, _user4;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              pageSize = +req.query.pageSize;
              page = +req.query.page - 1;
              _context5.next = 5;
              return User.findAll((0, models_1.paginate)({
                page: page,
                pageSize: pageSize
              }, {
                attributes: ['id', 'username', 'role']
              }));

            case 5:
              _user4 = _context5.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: _user4
              });
              _context5.next = 12;
              break;

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));
  };

  admin.updateUser = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var payload, updated;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              payload = req.body;

              if (!(payload.role in role_1.Role)) {
                res.json({
                  status: response_1.ResponseStatus.Failed,
                  error: 'Role Not Exist!'
                });
              }

              updated = {
                role: payload.role
              };
              _context6.next = 6;
              return User.update(updated, {
                where: {
                  id: req.params.id
                }
              });

            case 6:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context6.next = 12;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }));
  };

  admin.deleteOrder = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return User.destroy({
                where: {
                  id: req.params.id
                }
              });

            case 3:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context7.next = 9;
              break;

            case 6:
              _context7.prev = 6;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 6]]);
    }));
  };
})(admin = exports.admin || (exports.admin = {}));