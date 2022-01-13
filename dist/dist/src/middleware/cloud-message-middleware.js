"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const models_1 = __importDefault(require("../../models"));
const order_interface_1 = require("../../models/interfaces/order-interface");
const response_1 = require("../interfaces/response");
const cloud_message_helper_1 = require("../utils/cloud-message-helper");
const message_template_1 = require("../utils/message-template");
const Plate = models_1.default.Plate;
/** Admin */
var admin;
(function (admin) {
    admin.simulateEnter = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            const plate = yield Plate.findOne({ where: { license: payload.license } });
            if (!plate) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate Not Exist!',
                });
            }
            const user = yield plate.getUser();
            if (!user) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'User Not Exist!',
                });
            }
            const mockOrder = {
                enterTime: new Date(),
                status: order_interface_1.Status.pending,
                PlateId: plate.id,
            };
            const order = yield user.createOrder(mockOrder);
            yield (0, cloud_message_helper_1.sendMessage)((0, message_template_1.enterMessage)(user.deviceToken));
            res.send({
                status: response_1.ResponseStatus.Success,
                data: order.id,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.simulateExit = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            const plate = yield Plate.findOne({ where: { license: payload.license } });
            if (!plate) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate Not Exist!',
                });
            }
            const user = yield plate.getUser();
            if (!user) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'User Not Exist!',
                });
            }
            const orders = yield user.getOrders({
                where: {
                    status: order_interface_1.Status.exit,
                },
            });
            const order = orders[0];
            if (order == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Order not Exist or Have not pay.',
                });
            }
            else {
                yield order.update({
                    status: order_interface_1.Status.done,
                    exitTime: new Date(),
                });
                yield (0, cloud_message_helper_1.sendMessage)((0, message_template_1.doneMessage)(user.deviceToken));
                res.json({
                    status: response_1.ResponseStatus.Success,
                });
            }
        }
        catch (error) {
            throw error;
        }
    });
})(admin = exports.admin || (exports.admin = {}));
