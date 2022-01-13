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

var models_1 = __importStar(require("../../models"));

var order_interface_1 = require("../../models/interfaces/order-interface");

var response_1 = require("../interfaces/response");

var Order = models_1["default"].Order;
var Plate = models_1["default"].Plate;
var User = models_1["default"].User; // const sequelize = db.sequelize;

/** Normal User */

var user;

(function (user_1) {
  var _this = this;

  user_1.getLatestOrder = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _user, orders, order;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _user = req.user;
              _context.next = 4;
              return _user.getOrders({
                attributes: ['id', 'enterTime', 'exitTime', 'status', 'tradeAmount'],
                include: {
                  model: Plate,
                  attributes: ['license']
                },
                order: [['id', 'DESC']],
                limit: 1
              });

            case 4:
              orders = _context.sent;
              order = orders[0];
              res.json({
                status: response_1.ResponseStatus.Success,
                data: order
              });
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));
  };

  user_1.getAllOrders = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _user2, pageSize, page, orders;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _user2 = req.user;
              pageSize = +req.query.pageSize;
              page = +req.query.page - 1;
              _context2.next = 6;
              return _user2.getOrders((0, models_1.paginate)({
                page: page,
                pageSize: pageSize
              }, {
                order: [['id', 'DESC']],
                include: [Plate]
              }));

            case 6:
              orders = _context2.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: orders
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

  user_1.replyOrderChoice = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var _user3, orderId, choice, orders, order, updatedOrder;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _user3 = req.user;
              orderId = req.params.id;
              choice = req.body.choice;
              _context3.next = 6;
              return _user3.getOrders({
                where: {
                  id: orderId
                }
              });

            case 6:
              orders = _context3.sent;
              order = orders[0];

              if (!(order == null)) {
                _context3.next = 12;
                break;
              }

              res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Order not exist!'
              });
              _context3.next = 22;
              break;

            case 12:
              if (!choice) {
                _context3.next = 19;
                break;
              }

              _context3.next = 15;
              return order.update({
                status: order_interface_1.Status.enter,
                enterTime: new Date()
              });

            case 15:
              updatedOrder = _context3.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: updatedOrder
              });
              _context3.next = 22;
              break;

            case 19:
              _context3.next = 21;
              return order.destroy();

            case 21:
              res.json({
                status: response_1.ResponseStatus.Success
              });

            case 22:
              _context3.next = 28;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              throw _context3.t0;

            case 28:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 24]]);
    }));
  };

  user_1.deleteOrder = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var _user4, orderId, orders, order;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _user4 = req.user;
              orderId = req.params.id;
              _context4.next = 5;
              return _user4.getOrders({
                where: {
                  id: orderId
                },
                raw: true
              });

            case 5:
              orders = _context4.sent;
              order = orders[0];

              if (!(order == null)) {
                _context4.next = 11;
                break;
              }

              res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Order not exist!'
              });
              _context4.next = 14;
              break;

            case 11:
              _context4.next = 13;
              return order.destroy();

            case 13:
              res.json({
                status: response_1.ResponseStatus.Success
              });

            case 14:
              _context4.next = 19;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              throw _context4.t0;

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 16]]);
    }));
  };
})(user = exports.user || (exports.user = {}));
/** Admin */


var admin;

(function (admin) {
  var _this2 = this;

  admin.getCount = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var count;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return Order.count();

            case 3:
              count = _context5.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: count
              });
              _context5.next = 10;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              throw _context5.t0;

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));
  };

  admin.getOrder = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var order;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return Order.findOne({
                where: {
                  id: req.params.id
                },
                attributes: ['id', 'enterTime', 'exitTime', 'status', 'tradeAmount'],
                include: [{
                  model: Plate,
                  attributes: ['license']
                }, {
                  model: User,
                  attributes: ['username']
                }]
              });

            case 3:
              order = _context6.sent;

              if (!(order == null)) {
                _context6.next = 6;
                break;
              }

              return _context6.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Order not Exist !'
              }));

            case 6:
              res.json({
                status: response_1.ResponseStatus.Success,
                data: order
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

  admin.getAllOrders = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      var pageSize, page, order;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              pageSize = +req.query.pageSize;
              page = +req.query.page - 1;
              _context7.next = 5;
              return Order.findAll((0, models_1.paginate)({
                page: page,
                pageSize: pageSize
              }, {
                attributes: ['id', 'enterTime', 'exitTime', 'status', 'tradeAmount' // [sequelize.literal('"Plate"."license"'), 'licnese'],
                ],
                include: [{
                  model: Plate,
                  attributes: ['license']
                }, {
                  model: User,
                  attributes: ['username']
                }]
              }));

            case 5:
              order = _context7.sent;
              res.json({
                status: response_1.ResponseStatus.Success,
                data: order
              });
              _context7.next = 13;
              break;

            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
              throw _context7.t0;

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 9]]);
    }));
  };

  admin.createOrder = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      var payload, plateId, userId, plate, _user5, created;

      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              payload = req.body;

              if (!payload.Plate) {
                _context8.next = 15;
                break;
              }

              _context8.next = 5;
              return Plate.findOne({
                where: {
                  license: payload.Plate.license
                }
              });

            case 5:
              plate = _context8.sent;

              if (plate) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate Not Exist!'
              }));

            case 8:
              plateId = plate.id;
              _context8.next = 11;
              return plate.getUser();

            case 11:
              _user5 = _context8.sent;

              if (_user5) {
                _context8.next = 14;
                break;
              }

              return _context8.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User Not Exist!'
              }));

            case 14:
              userId = _user5.id;

            case 15:
              created = {
                enterTime: payload.enterTime,
                exiTime: payload.exiTime,
                status: payload.status,
                tradeAmount: payload.tradeAmount,
                PlateId: plateId,
                UserId: userId
              };
              _context8.next = 18;
              return Order.create(created);

            case 18:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context8.next = 24;
              break;

            case 21:
              _context8.prev = 21;
              _context8.t0 = _context8["catch"](0);
              throw _context8.t0;

            case 24:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 21]]);
    }));
  };

  admin.updateOrder = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      var payload, plateId, userId, plate, _user6, updated;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              payload = req.body;

              if (!payload.Plate) {
                _context9.next = 15;
                break;
              }

              _context9.next = 5;
              return Plate.findOne({
                where: {
                  license: payload.Plate.license
                }
              });

            case 5:
              plate = _context9.sent;

              if (plate) {
                _context9.next = 8;
                break;
              }

              return _context9.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate Not Exist!'
              }));

            case 8:
              plateId = plate.id;
              _context9.next = 11;
              return plate.getUser();

            case 11:
              _user6 = _context9.sent;

              if (_user6) {
                _context9.next = 14;
                break;
              }

              return _context9.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User Not Exist!'
              }));

            case 14:
              userId = _user6.id;

            case 15:
              updated = {
                enterTime: payload.enterTime,
                exiTime: payload.exiTime,
                status: payload.status,
                tradeAmount: payload.tradeAmount,
                PlateId: plateId,
                UserId: userId
              };
              _context9.next = 18;
              return Order.update(updated, {
                where: {
                  id: req.params.id
                }
              });

            case 18:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context9.next = 24;
              break;

            case 21:
              _context9.prev = 21;
              _context9.t0 = _context9["catch"](0);
              throw _context9.t0;

            case 24:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 21]]);
    }));
  };

  admin.deleteOrder = function (req, res) {
    return __awaiter(_this2, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return Order.destroy({
                where: {
                  id: req.params.id
                }
              });

            case 3:
              res.json({
                status: response_1.ResponseStatus.Success
              });
              _context10.next = 9;
              break;

            case 6:
              _context10.prev = 6;
              _context10.t0 = _context10["catch"](0);
              throw _context10.t0;

            case 9:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 6]]);
    }));
  };
})(admin = exports.admin || (exports.admin = {}));