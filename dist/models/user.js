'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
const sequelize_1 = require('sequelize');
const role_1 = require('./interfaces/role');
exports.default = (sequelize) => {
    const User = sequelize.define('User', {
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
        role: {
            type: sequelize_1.DataTypes.ENUM,
            values: role_1.RoleNames,
            defaultValue: role_1.Role.user,
        },
    });
    User.associate = function(models) {
        User.hasMany(models['Order'], {
            foreignKey: 'userId',
        });
    };
    return User;
};
