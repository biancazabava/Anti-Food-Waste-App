const { DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const Aliment = sequelize.define(
  "Aliment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    denumire: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    data_expirare: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Mancare gatita", "Lactate,", "Fructe si legume", "Carne"],
    },
    disponibilitate: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Disponibil", "Indisponibil"],
    },
    alert: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
    },
  },
  {
    tableName: "Alimente",
  }
);
module.exports = Aliment;
