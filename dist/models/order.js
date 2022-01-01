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
Object.defineProperty(exports, '__esModule', {value: true});
const sequelize_1 = require('sequelize');
const order_interface_1 = require('./interfaces/order-interface');
exports.default = (sequelize) => {
    const Order = sequelize.define('Order', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        enterTime: {
            type: sequelize_1.DataTypes.DATE,
        },
        exitTime: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM,
            values: order_interface_1.StatusNames,
            defaultValue: order_interface_1.Status.pending,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        billId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        licenseId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
    });
    Order.createByUserId = function(userId, licenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(userId, licenseId);
                const mockOrder = {
                    enterTime: new Date(),
                    status: order_interface_1.Status.pending,
                    userId: userId,
                    licenseId: licenseId,
                };
                const instance = yield this.create(mockOrder);
                // console.log(instance.associations);
                // const user = await instance.getUser();
                return instance;
            } catch (err) {
                console.log(err);
            }
        });
    };
    Order.associate = function(models) {
        Order.belongsTo(models['User']);
    };
    return Order;
};
