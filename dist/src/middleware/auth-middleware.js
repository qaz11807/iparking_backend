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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.permissionAuth = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
var passport_jwt_1 = __importDefault(require("passport-jwt"));
var passport_local_1 = require("passport-local");
var models_1 = __importDefault(require("../../models"));
var role_1 = require("../../models/interfaces/role");
var config_1 = __importDefault(require("../../config"));
var JWTStrategy = passport_jwt_1.default.Strategy;
var extractJWT = passport_jwt_1.default.ExtractJwt;
var secretKey = config_1.default.jwtSecret;
var User = models_1.default.User;
var checkPassword = function (user, password) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_1 = _a.sent();
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
passport_1.default.use('signin', new passport_local_1.Strategy(function (username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                isValid = false;
                return [4 /*yield*/, User.findOne({ where: { username: username }, raw: true })];
            case 1:
                user = _a.sent();
                if (!(user !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, checkPassword(user, password)];
            case 2:
                isValid = _a.sent();
                _a.label = 3;
            case 3:
                if (isValid) {
                    done(null, user);
                }
                else {
                    done(null, null);
                }
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                done(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); }));
passport_1.default.use('token', new JWTStrategy({
    jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
}, function (jwtPayload, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.findByPk(jwtPayload.id)];
            case 1:
                user = _a.sent();
                if (user !== null) {
                    done(null, user);
                }
                else {
                    done('Can not find user !');
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                done(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }));
var permissionAuth = function (req, res, next) {
    var isAllowed = false;
    if (req.user !== undefined) {
        var user = req.user;
        isAllowed = user.role === role_1.Role.admin;
    }
    if (isAllowed) {
        next();
    }
    else {
        return res.status(401).send('unauthorized');
    }
};
exports.permissionAuth = permissionAuth;
var signin = function (req, res) {
    try {
        if (req.user !== undefined) {
            var token = jsonwebtoken_1.default.sign(req.user, secretKey);
            res.json(token);
        }
    }
    catch (error) {
        throw error;
    }
};
exports.signin = signin;
