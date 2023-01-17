const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const Utilizator = sequelize.define(
  "Utilizator",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Utilizatori",
  }
);

module.exports = Utilizator;
