"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../../models"));
exports.default = (io) => {
    models_1.default.Order.afterUpdate((order) => {
        // console.log('Order Updated', order);
        const id = order.id;
        io.sockets.emit(`order:${id}`, order);
    });
    models_1.default.Order.afterBulkUpdate((order) => {
        // console.log('Order Bulk Updated', order);
        const id = order.where.id;
        io.sockets.emit(`order:${id}`, Object.assign(Object.assign({}, order.attributes), { id: order.where.id }));
    });
};
