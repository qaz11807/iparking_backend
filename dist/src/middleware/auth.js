'use strict';
const __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
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
const __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : {'default': mod};
};
Object.defineProperty(exports, '__esModule', {value: true});
const bcrypt_1 = __importDefault(require('bcrypt'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const passport_1 = __importDefault(require('passport'));
const passport_jwt_1 = __importDefault(require('passport-jwt'));
const passport_local_1 = require('passport-local');
const models_1 = __importDefault(require('../../models'));
const JWTStrategy = passport_jwt_1.default.Strategy;
const extractJWT = passport_jwt_1.default.ExtractJwt;
const secretKey = process.env.SECRET || 'secret';
const User = models_1.default.User;
const checkPassword = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(password, user.password);
    } catch (err) {
        throw err;
    }
});
passport_1.default.use('signin', new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({where: {username}});
        if (user != null) {
            const isEqual = yield checkPassword(user, password);
            if (isEqual) {
                done(null, user);
            } else {
                done(new Error('Compare password failed!'), false);
            }
        }
    } catch (err) {
        done(err, false);
    }
})));
passport_1.default.use('token', new JWTStrategy({
    jwtFromRequest: extractJWT.fromBodyField('Authorization'),
    secretOrKey: secretKey,
}, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findByPk(jwtPayload._id);
        done(null, user);
    } catch (err) {
        done(err);
    }
})));
exports.default = (req, res) => {
    try {
        if (req.user != undefined) {
            const token = jsonwebtoken_1.default.sign(req.user, secretKey);
            res.json(token);
        }
    } catch (error) {
        throw new Error('Failed to sign jwt');
    }
};
