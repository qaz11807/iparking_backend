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
exports.createOrder = void 0;
const models_1 = __importDefault(require('../../models'));
const Order = models_1.default.Order;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(Order);
        const user = req.user;
        const payload = req.body;
        const instance = yield Order.createByUserId(user.id, payload.licenseId);
        console.log(instance);
        res.json({
            status: 'Success!',
        });
    } catch (error) {
        throw error;
    }
});
exports.createOrder = createOrder;
