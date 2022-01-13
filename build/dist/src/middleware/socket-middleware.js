"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var models_1 = __importDefault(require("../../models"));

exports["default"] = function (io) {
  models_1["default"].Order.afterUpdate(function (order) {
    // console.log('Order Updated', order);
    var id = order.id;
    io.sockets.emit("order:".concat(id), order);
  });
  models_1["default"].Order.afterBulkUpdate(function (order) {
    // console.log('Order Bulk Updated', order);
    var id = order.where.id;
    io.sockets.emit("order:".concat(id), Object.assign(Object.assign({}, order.attributes), {
      id: order.where.id
    }));
  });
};