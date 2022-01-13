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
exports.admin = exports.user = exports.checkPlateIsExist = void 0;

var models_1 = __importStar(require("../../models"));

var response_1 = require("../interfaces/response");

var User = models_1["default"].User;
var Plate = models_1["default"].Plate;

var checkPlateIsExist = function checkPlateIsExist(license, id) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var plate;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Plate.findOne({
              where: {
                id: id,
                license: license
              }
            });

          case 3:
            plate = _context.sent;
            return _context.abrupt("return", plate !== null);

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

exports.checkPlateIsExist = checkPlateIsExist;
/** Normal User */

var user;

(function (user_1) {
  var _this = this;

  user_1.getAllPlates = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _user, pageSize, page, plates;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _user = req.user;
              pageSize = +req.query.pageSize;
              page = +req.query.page - 1;
              _context2.next = 6;
              return _user.getPlates((0, models_1.paginate)({
                page: page,
                pageSize: pageSize
              }));

            case 6:
              plates = _context2.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: plates
              });
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }));
  };

  user_1.createPlate = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _user2, license, isExist;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _user2 = req.user;
              license = req.body.license;
              _context3.next = 5;
              return (0, exports.checkPlateIsExist)(license, null);

            case 5:
              isExist = _context3.sent;

              if (!isExist) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate License already exist!'
              }));

            case 8:
              _context3.next = 10;
              return _user2.createPlate({
                license: license
              });

            case 10:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context3.next = 16;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              throw _context3.t0;

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 13]]);
    }));
  };

  user_1.updatePlate = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _user3, plateId, license, isExist, plates, plate, updatedPlate;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _user3 = req.user;
              plateId = req.params.id;
              license = req.body.license;
              _context4.next = 6;
              return (0, exports.checkPlateIsExist)(license, +plateId);

            case 6:
              isExist = _context4.sent;

              if (!isExist) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate License already exist!'
              }));

            case 9:
              _context4.next = 11;
              return _user3.createPlate({
                license: license
              });

            case 11:
              _context4.next = 13;
              return _user3.getPlates({
                where: {
                  id: plateId
                },
                raw: true
              });

            case 13:
              plates = _context4.sent;
              plate = plates[0];

              if (!(plate == null)) {
                _context4.next = 19;
                break;
              }

              res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate not exist!'
              });
              _context4.next = 23;
              break;

            case 19:
              _context4.next = 21;
              return plate.update({
                license: license
              });

            case 21:
              updatedPlate = _context4.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: updatedPlate
              });

            case 23:
              _context4.next = 28;
              break;

            case 25:
              _context4.prev = 25;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;

            case 28:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 25]]);
    }));
  };

  user_1.deletePlate = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var _user4, plateId, plates, plate;

      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _user4 = req.user;
              plateId = req.params.id;
              _context5.next = 5;
              return _user4.getPlates({
                where: {
                  id: plateId
                },
                raw: true
              });

            case 5:
              plates = _context5.sent;
              plate = plates[0];

              if (!(plate == null)) {
                _context5.next = 11;
                break;
              }

              res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate not exist!'
              });
              _context5.next = 14;
              break;

            case 11:
              _context5.next = 13;
              return plate.destroy();

            case 13:
              res.json({
                status: response_1.ResponseStatus.Success
              });

            case 14:
              _context5.next = 19;
              break;

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 16]]);
    }));
  };
})(user = exports.user || (exports.user = {}));
/** Admin */


var admin;

(function (admin) {
  var _this2 = this;

  admin.getCount = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var count;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return Plate.count();

            case 3:
              count = _context6.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: count
              });
              _context6.next = 10;
              break;

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              throw _context6.t0;

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 7]]);
    }));
  };

  admin.getPlate = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var plate;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return Plate.findOne({
                where: {
                  id: req.params.id
                },
                attributes: ['id', 'license'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              });

            case 3:
              plate = _context7.sent;

              if (plate == null) {
                res.json({
                  status: response_1.ResponseStatus.Failed,
                  error: 'Plate not Exist !'
                });
              }

              res.json({
                status: response_1.ResponseStatus.Success,
                data: plate
              });
              _context7.next = 11;
              break;

            case 8:
              _context7.prev = 8;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 8]]);
    }));
  };

  admin.getAllPlates = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var pageSize, page, plates;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              pageSize = +req.query.pageSize;
              page = +req.query.page - 1;
              _context8.next = 5;
              return Plate.findAll((0, models_1.paginate)({
                page: page,
                pageSize: pageSize
              }, {
                attributes: ['id', 'license'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              }));

            case 5:
              plates = _context8.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: plates
              });
              _context8.next = 12;
              break;

            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              throw _context8.t0;

            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 9]]);
    }));
  };

  admin.createPlate = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var payload, userId, _user5, isExist, created;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              payload = req.body;

              if (!payload.User) {
                _context9.next = 9;
                break;
              }

              _context9.next = 5;
              return User.findOne({
                where: {
                  username: payload.User.username
                }
              });

            case 5:
              _user5 = _context9.sent;

              if (_user5) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User Not Exist!'
              }));

            case 8:
              userId = _user5.id;

            case 9:
              _context9.next = 11;
              return (0, exports.checkPlateIsExist)(payload.license, null);

            case 11:
              isExist = _context9.sent;

              if (!isExist) {
                _context9.next = 14;
                break;
              }

              return _context9.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate License already exist!'
              }));

            case 14:
              created = {
                license: payload.license,
                UserId: userId
              };
              _context9.next = 17;
              return Plate.create(created);

            case 17:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context9.next = 23;
              break;

            case 20:
              _context9.prev = 20;
              _context9.t0 = _context9["catch"](0);
              throw _context9.t0;

            case 23:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 20]]);
    }));
  };

  admin.updatePlate = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      var payload, userId, _user6, isExist, updated;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              payload = req.body;

              if (!payload.User) {
                _context10.next = 9;
                break;
              }

              _context10.next = 5;
              return User.findOne({
                where: {
                  username: payload.User.username
                }
              });

            case 5:
              _user6 = _context10.sent;

              if (_user6) {
                _context10.next = 8;
                break;
              }

              return _context10.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User Not Exist!'
              }));

            case 8:
              userId = _user6.id;

            case 9:
              _context10.next = 11;
              return (0, exports.checkPlateIsExist)(payload.license, +payload.id);

            case 11:
              isExist = _context10.sent;

              if (!isExist) {
                _context10.next = 14;
                break;
              }

              return _context10.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate License already exist!'
              }));

            case 14:
              updated = {
                license: payload.license,
                UserId: userId
              };
              _context10.next = 17;
              return Plate.update(updated, {
                where: {
                  id: req.params.id
                }
              });

            case 17:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context10.next = 23;
              break;

            case 20:
              _context10.prev = 20;
              _context10.t0 = _context10["catch"](0);
              throw _context10.t0;

            case 23:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 20]]);
    }));
  };

  admin.deletePlate = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return Plate.destroy({
                where: {
                  id: req.params.id
                }
              });

            case 3:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context11.next = 9;
              break;

            case 6:
              _context11.prev = 6;
              _context11.t0 = _context11["catch"](0);
              throw _context11.t0;

            case 9:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 6]]);
    }));
  };
})(admin = exports.admin || (exports.admin = {}));