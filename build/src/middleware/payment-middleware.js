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
exports.user = void 0;

var models_1 = __importDefault(require("../../models"));

var order_interface_1 = require("../../models/interfaces/order-interface");

var response_1 = require("../interfaces/response");

var ecpay_1 = require("../utils/ecpay");

var calcuaute_1 = require("../utils/calcuaute");

var cloud_message_helper_1 = require("../utils/cloud-message-helper");

var message_template_1 = require("../utils/message-template");
/** Normal User */


var user;

(function (user_1) {
  var _this = this;

  user_1.getPayUrl = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var _user, orderId, orders, order, price, url;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _user = req.user;
              orderId = req.params.id;
              _context.next = 5;
              return _user.getOrders({
                where: {
                  id: orderId
                }
              });

            case 5:
              orders = _context.sent;
              order = orders[0];

              if (order == null) {
                res.json({
                  status: response_1.ResponseStatus.Failed,
                  error: 'Order not exist!'
                });
              } else {
                price = (0, calcuaute_1.calcauteParkingPrice)(order.enterTime, new Date());
                url = (0, ecpay_1.generatePayUrl)(order.id, price);
                res.json({
                  status: response_1.ResponseStatus.Success,
                  data: url
                });
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              throw _context.t0;

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }));
  };

  user_1.paidResultCallback = function (req, res) {
    return __awaiter(_this, void 0, void 0, /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var _req$body, RtnCode, RtnMsg, MerchantTradeNo, TradeAmt, orderId, order, _user2, deviceToken, messagePaidResult;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, RtnCode = _req$body.RtnCode, RtnMsg = _req$body.RtnMsg, MerchantTradeNo = _req$body.MerchantTradeNo, TradeAmt = _req$body.TradeAmt;
              orderId = req.params.id;
              console.log("order_id = ".concat(orderId, " , RtnCode = ").concat(RtnCode, " , RtnMsg = ").concat(RtnMsg, " , MerchantTradeNo = ").concat(MerchantTradeNo));
              _context2.prev = 3;
              _context2.next = 6;
              return models_1["default"].Order.findOne({
                where: {
                  id: orderId
                }
              });

            case 6:
              order = _context2.sent;

              if (!(order == null)) {
                _context2.next = 10;
                break;
              }

              res.send('1');
              return _context2.abrupt("return");

            case 10:
              _context2.next = 12;
              return order.getUser({
                raw: true
              });

            case 12:
              _user2 = _context2.sent;
              deviceToken = _user2.deviceToken;

              if (!(RtnCode === '1')) {
                _context2.next = 19;
                break;
              }

              _context2.next = 17;
              return order.update({
                status: order_interface_1.Status.exit,
                exitTime: new Date(),
                tradeAmount: TradeAmt
              });

            case 17:
              _context2.next = 19;
              return (0, cloud_message_helper_1.sendMessage)((0, message_template_1.exitMessage)(deviceToken));

            case 19:
              messagePaidResult = {
                data: {
                  paidResult: RtnCode
                },
                token: deviceToken
              };
              _context2.next = 22;
              return (0, cloud_message_helper_1.sendMessage)(messagePaidResult);

            case 22:
              res.send('1');
              _context2.next = 28;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](3);
              throw _context2.t0;

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[3, 25]]);
    }));
  };
})(user = exports.user || (exports.user = {}));