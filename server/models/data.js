"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    static associate(models) {
      // define association here
    }
  }
  Data.init(
    {
      DeviceId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Device ID is required" },
          notEmpty: { msg: "Device ID is required" },
        },
      },
      DeviceType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Device type is required" },
          notEmpty: { msg: "Device type is required" },
        },
      },
      Timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Timestamp is required" },
          notEmpty: { msg: "Timestamp is required" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Location is required" },
          notEmpty: { msg: "Location is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Data",
    }
  );
  return Data;
};
