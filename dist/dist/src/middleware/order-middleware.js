"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
}) : (function (o, m, k, k2) {
    if (k2 === undefined)
        k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.user = void 0;
const models_1 = __importStar(require("../../models"));
const order_interface_1 = require("../../models/interfaces/order-interface");
const response_1 = require("../interfaces/response");
const Order = models_1.default.Order;
const Plate = models_1.default.Plate;
const User = models_1.default.User;
// const sequelize = db.sequelize;
/** Normal User */
var user;
(function (user_1) {
    user_1.getLatestOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const orders = yield user.getOrders({
                attributes: [
                    'id', 'enterTime', 'exitTime', 'status', 'tradeAmount',
                ],
                include: {
                    model: Plate,
                    attributes: ['license'],
                },
                order: [['id', 'DESC']],
                limit: 1,
            });
            const order = orders[0];
            res.json({
                status: response_1.ResponseStatus.Success,
                data: order,
            });
        }
        catch (error) {
            throw error;
        }
    });
    user_1.getAllOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const pageSize = +req.query.pageSize;
            const page = +req.query.page - 1;
            const orders = yield user.getOrders((0, models_1.paginate)({ page: page, pageSize: pageSize }, { order: [['id', 'DESC']], include: [Plate] }));
            res.json({
                status: response_1.ResponseStatus.Success,
                data: orders,
            });
        }
        catch (error) {
            throw error;
        }
    });
    user_1.replyOrderChoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const orderId = req.params.id;
            const choice = req.body.choice;
            const orders = yield user.getOrders({
                where: { id: orderId },
            });
            const order = orders[0];
            if (order == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Order not exist!',
                });
            }
            else {
                if (choice) {
                    const updatedOrder = yield order.update({
                        status: order_interface_1.Status.enter,
                        enterTime: new Date(),
                    });
                    res.json({
                        status: response_1.ResponseStatus.Success,
                        data: updatedOrder,
                    });
                }
                else {
                    yield order.destroy();
                    res.json({
                        status: response_1.ResponseStatus.Success,
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    user_1.deleteOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const orderId = req.params.id;
            const orders = yield user.getOrders({
                where: { id: orderId }, raw: true,
            });
            const order = orders[0];
            if (order == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Order not exist!',
                });
            }
            else {
                yield order.destroy();
                res.json({
                    status: response_1.ResponseStatus.Success,
                });
            }
        }
        catch (error) {
            throw error;
        }
    });
})(user = exports.user || (exports.user = {}));
/** Admin */
var admin;
(function (admin) {
    admin.getCount = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const count = yield Order.count();
            res.json({
                status: response_1.ResponseStatus.Success,
                data: count,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.getOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const order = yield Order.findOne({
                where: { id: req.params.id },
                attributes: [
                    'id', 'enterTime', 'exitTime', 'status', 'tradeAmount',
                ],
                include: [
                    {
                        model: Plate,
                        attributes: ['license'],
                    },
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            });
            if (order == null) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Order not Exist !',
                });
            }
            res.json({
                status: response_1.ResponseStatus.Success,
                data: order,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.getAllOrders = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const pageSize = +req.query.pageSize;
            const page = +req.query.page - 1;
            const order = yield Order.findAll((0, models_1.paginate)({ page: page, pageSize: pageSize }, {
                attributes: [
                    'id', 'enterTime', 'exitTime', 'status', 'tradeAmount',
                    // [sequelize.literal('"Plate"."license"'), 'licnese'],
                ],
                include: [
                    {
                        model: Plate,
                        attributes: ['license'],
                    },
                    {
                        model: User,
                        attributes: ['username'],
                    },
                ],
            }));
            res.json({
                status: response_1.ResponseStatus.Success,
                data: order,
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
    admin.createOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            let plateId;
            let userId;
            if (payload.Plate) {
                const plate = yield Plate.findOne({ where: { license: payload.Plate.license } });
                if (!plate) {
                    return res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'Plate Not Exist!',
                    });
                }
                plateId = plate.id;
                const user = yield plate.getUser();
                if (!user) {
                    return res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }
            const created = {
                enterTime: payload.enterTime,
                exiTime: payload.exiTime,
                status: payload.status,
                tradeAmount: payload.tradeAmount,
                PlateId: plateId,
                UserId: userId,
            };
            yield Order.create(created);
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.updateOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            let plateId;
            let userId;
            if (payload.Plate) {
                const plate = yield Plate.findOne({ where: { license: payload.Plate.license } });
                if (!plate) {
                    return res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'Plate Not Exist!',
                    });
                }
                plateId = plate.id;
                const user = yield plate.getUser();
                if (!user) {
                    return res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }
            const updated = {
                enterTime: payload.enterTime,
                exiTime: payload.exiTime,
                status: payload.status,
                tradeAmount: payload.tradeAmount,
                PlateId: plateId,
                UserId: userId,
            };
            yield Order.update(updated, { where: { id: req.params.id } });
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.deleteOrder = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Order.destroy({ where: { id: req.params.id } });
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
})(admin = exports.admin || (exports.admin = {}));
