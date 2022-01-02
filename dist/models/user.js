"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var role_1 = require("./interfaces/role");
exports.default = (function (sequelize) {
    var User = sequelize.define('User', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
        },
        deviceToken: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: sequelize_1.DataTypes.ENUM,
            values: role_1.RoleNames,
            defaultValue: role_1.Role.user,
        },
    });
    User.associate = function (models) {
        User.hasMany(models['Order']);
        User.hasMany(models['Plate']);
    };
    return User;
});
