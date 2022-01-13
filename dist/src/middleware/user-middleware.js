"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.user = void 0;
const response_1 = require("../interfaces/response");
const models_1 = __importStar(require("../../models"));
const role_1 = require("../../models/interfaces/role");
const User = models_1.default.User;
var user;
(function (user_1) {
    user_1.updateDeviceToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const token = req.body.token;
            yield user.update({
                deviceToken: token,
            });
            res.json({
                status: response_1.ResponseStatus.Success,
            });
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
            const count = yield User.count();
            res.json({
                status: response_1.ResponseStatus.Success,
                data: count,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.getSelf = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            res.json({
                status: response_1.ResponseStatus.Success,
                data: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                },
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({
                where: { id: req.params.id },
                attributes: [
                    'id', 'username', 'role',
                ],
            });
            if (user == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'User not Exist !',
                });
            }
            res.json({
                status: response_1.ResponseStatus.Success,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const pageSize = +req.query.pageSize;
            const page = +req.query.page - 1;
            const user = yield User.findAll((0, models_1.paginate)({ page: page, pageSize: pageSize }, {
                attributes: [
                    'id', 'username', 'role',
                ],
            }));
            res.json({
                status: response_1.ResponseStatus.Success,
                data: user,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            if (!(payload.role in role_1.Role)) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Role Not Exist!',
                });
            }
            const updated = {
                role: payload.role,
            };
            yield User.update(updated, { where: { id: req.params.id } });
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
            yield User.destroy({ where: { id: req.params.id } });
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
})(admin = exports.admin || (exports.admin = {}));
