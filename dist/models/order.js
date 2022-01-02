"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var order_interface_1 = require("./interfaces/order-interface");
exports.default = (function (sequelize) {
    var Order = sequelize.define('Order', {
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
        tradeAmount: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM,
            values: order_interface_1.StatusNames,
            defaultValue: order_interface_1.Status.pending,
        },
    });
    Order.associate = function (models) {
        Order.belongsTo(models['User']);
        Order.belongsTo(models['Plate']);
    };
    return Order;
});
