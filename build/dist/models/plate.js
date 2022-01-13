"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sequelize_1 = require("sequelize");

exports["default"] = function (sequelize) {
  var Plate = sequelize.define('Plate', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: sequelize_1.DataTypes.INTEGER
    },
    license: {
      type: sequelize_1.DataTypes.STRING
    }
  });

  Plate.associate = function (models) {
    Plate.belongsTo(models['User']);
    Plate.hasMany(models['Order']);
  };

  return Plate;
};