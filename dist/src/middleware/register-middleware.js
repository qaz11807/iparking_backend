"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserWithRole = exports.registerUser = exports.checkUserIsExist = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = __importDefault(require("../../models"));
const role_1 = require("../../models/interfaces/role");
const response_1 = require("../interfaces/response");
const User = models_1.default.User;
const checkUserIsExist = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ where: { username } });
        return user !== null;
    }
    catch (err) {
        throw err;
    }
});
exports.checkUserIsExist = checkUserIsExist;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = {
            username: payload.username,
            password: payload.password,
            role: role_1.Role.user,
        };
        const isExist = yield (0, exports.checkUserIsExist)(user.username);
        if (isExist) {
            res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User already exist !',
            });
        }
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            yield User.create(Object.assign(Object.assign({}, user), { password: hash }));
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.registerUser = registerUser;
const registerUserWithRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const user = {
            username: payload.username,
            password: payload.password,
            role: payload.role,
        };
        const isExist = yield (0, exports.checkUserIsExist)(user.username);
        if (isExist) {
            res.json({
                status: response_1.ResponseStatus.Failed,
                error: 'User already exist !',
            });
        }
        else {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            yield User.create(Object.assign(Object.assign({}, user), { password: hash }));
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
    }
    catch (error) {
        throw error;
    }
});
exports.registerUserWithRole = registerUserWithRole;
