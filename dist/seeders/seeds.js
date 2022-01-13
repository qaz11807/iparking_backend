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
const models_1 = __importDefault(require("../models"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const role_1 = require("../models/interfaces/role");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield models_1.default.sequelize.sync();
        const userDatas = [{
                username: 'admin',
                password: '1234',
                role: role_1.Role.admin,
            }, {
                username: 'test',
                password: '1234',
                role: role_1.Role.user,
            }];
        const salt = yield bcrypt_1.default.genSalt(10);
        const response = userDatas.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            return yield models_1.default.User.findOrCreate({ where: { username: user.username }, defaults: Object.assign(Object.assign({}, user), { password: hash }) });
        }));
        yield Promise.all(response);
        console.log(response);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}))();
