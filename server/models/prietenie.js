const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const Prietenie = sequelize.define(
  "Prietenie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_one: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_two: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Prietenii",
  }
);

module.exports = Prietenie;
