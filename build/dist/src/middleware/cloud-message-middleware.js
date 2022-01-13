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
exports.admin = void 0;

var models_1 = __importDefault(require("../../models"));

var order_interface_1 = require("../../models/interfaces/order-interface");

var response_1 = require("../interfaces/response");

var cloud_message_helper_1 = require("../utils/cloud-message-helper");

var message_template_1 = require("../utils/message-template");

var Plate = models_1["default"].Plate;
/** Admin */

var admin;

(function (admin) {
  var _this = this;

  admin.simulateEnter = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var payload, plate, user, mockOrder, order;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              payload = req.body;
              _context.next = 4;
              return Plate.findOne({
                where: {
                  license: payload.license
                }
              });

            case 4:
              plate = _context.sent;

              if (plate) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate Not Exist!'
              }));

            case 7:
              _context.next = 9;
              return plate.getUser();

            case 9:
              user = _context.sent;

              if (user) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User Not Exist!'
              }));

            case 12:
              mockOrder = {
                enterTime: new Date(),
                status: order_interface_1.Status.pending,
                PlateId: plate.id
              };
              _context.next = 15;
              return user.createOrder(mockOrder);

            case 15:
              order = _context.sent;
              _context.next = 18;
              return (0, cloud_message_helper_1.sendMessage)((0, message_template_1.enterMessage)(user.deviceToken));

            case 18:
              res.send({
                status: response_1.ResponseStatus.Success,
                data: order.id
              });
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));
  };

  admin.simulateExit = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var payload, plate, user, orders, order;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              payload = req.body;
              _context2.next = 4;
              return Plate.findOne({
                where: {
                  license: payload.license
                }
              });

            case 4:
              plate = _context2.sent;

              if (plate) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Plate Not Exist!'
              }));

            case 7:
              _context2.next = 9;
              return plate.getUser();

            case 9:
              user = _context2.sent;

              if (user) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User Not Exist!'
              }));

            case 12:
              _context2.next = 14;
              return user.getOrders({
                where: {
                  status: order_interface_1.Status.exit
                }
              });

            case 14:
              orders = _context2.sent;
              order = orders[0];

              if (!(order == null)) {
                _context2.next = 20;
                break;
              }

              res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'Order not Exist or Have not pay.'
              });
              _context2.next = 25;
              break;

            case 20:
              _context2.next = 22;
              return order.update({
                status: order_interface_1.Status.done,
                exitTime: new Date()
              });

            case 22:
              _context2.next = 24;
              return (0, cloud_message_helper_1.sendMessage)((0, message_template_1.doneMessage)(user.deviceToken));

            case 24:
              res.json({
                status: response_1.ResponseStatus.Success
              });

            case 25:
              _context2.next = 30;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](0);
              throw _context2.t0;

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 27]]);
    }));
  };
})(admin = exports.admin || (exports.admin = {}));