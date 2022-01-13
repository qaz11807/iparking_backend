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
exports.admin = exports.user = exports.checkPlateIsExist = void 0;
const models_1 = __importStar(require("../../models"));
const response_1 = require("../interfaces/response");
const User = models_1.default.User;
const Plate = models_1.default.Plate;
const checkPlateIsExist = (license, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plate = yield Plate.findOne({ where: { id, license } });
        return plate !== null;
    }
    catch (err) {
        throw err;
    }
});
exports.checkPlateIsExist = checkPlateIsExist;
/** Normal User */
var user;
(function (user_1) {
    user_1.getAllPlates = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const pageSize = +req.query.pageSize;
            const page = +req.query.page - 1;
            const plates = yield user.getPlates((0, models_1.paginate)({ page: page, pageSize: pageSize }));
            res.json({
                status: response_1.ResponseStatus.Success,
                data: plates,
            });
        }
        catch (error) {
            throw error;
        }
    });
    user_1.createPlate = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const license = req.body.license;
            const isExist = yield (0, exports.checkPlateIsExist)(license, null);
            if (isExist) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }
            yield user.createPlate({
                license: license,
            });
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
    user_1.updatePlate = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const plateId = req.params.id;
            const license = req.body.license;
            const isExist = yield (0, exports.checkPlateIsExist)(license, +plateId);
            if (isExist) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }
            yield user.createPlate({
                license: license,
            });
            const plates = yield user.getPlates({
                where: { id: plateId }, raw: true,
            });
            const plate = plates[0];
            if (plate == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate not exist!',
                });
            }
            else {
                const updatedPlate = yield plate.update({
                    license: license,
                });
                res.json({
                    status: response_1.ResponseStatus.Success,
                    data: updatedPlate,
                });
            }
        }
        catch (error) {
            throw error;
        }
    });
    user_1.deletePlate = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const plateId = req.params.id;
            const plates = yield user.getPlates({
                where: { id: plateId }, raw: true,
            });
            const plate = plates[0];
            if (plate == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate not exist!',
                });
            }
            else {
                yield plate.destroy();
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
            const count = yield Plate.count();
            res.json({
                status: response_1.ResponseStatus.Success,
                data: count,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.getPlate = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const plate = yield Plate.findOne({
                where: { id: req.params.id },
                attributes: [
                    'id', 'license',
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            });
            if (plate == null) {
                res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate not Exist !',
                });
            }
            res.json({
                status: response_1.ResponseStatus.Success,
                data: plate,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.getAllPlates = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const pageSize = +req.query.pageSize;
            const page = +req.query.page - 1;
            const plates = yield Plate.findAll((0, models_1.paginate)({ page: page, pageSize: pageSize }, {
                attributes: [
                    'id', 'license',
                ],
                include: {
                    model: User,
                    attributes: ['username'],
                },
            }));
            res.json({
                status: response_1.ResponseStatus.Success,
                data: plates,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.createPlate = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            let userId;
            if (payload.User) {
                const user = yield User.findOne({ where: { username: payload.User.username } });
                if (!user) {
                    return res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }
            const isExist = yield (0, exports.checkPlateIsExist)(payload.license, null);
            if (isExist) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }
            const created = {
                license: payload.license,
                UserId: userId,
            };
            yield Plate.create(created);
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.updatePlate = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = req.body;
            let userId;
            if (payload.User) {
                const user = yield User.findOne({ where: { username: payload.User.username } });
                if (!user) {
                    return res.json({
                        status: response_1.ResponseStatus.Failed,
                        error: 'User Not Exist!',
                    });
                }
                userId = user.id;
            }
            const isExist = yield (0, exports.checkPlateIsExist)(payload.license, +payload.id);
            if (isExist) {
                return res.json({
                    status: response_1.ResponseStatus.Failed,
                    error: 'Plate License already exist!',
                });
            }
            const updated = {
                license: payload.license,
                UserId: userId,
            };
            yield Plate.update(updated, { where: { id: req.params.id } });
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
    admin.deletePlate = (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Plate.destroy({ where: { id: req.params.id } });
            res.json({
                status: response_1.ResponseStatus.Success,
            });
        }
        catch (error) {
            throw error;
        }
    });
})(admin = exports.admin || (exports.admin = {}));
