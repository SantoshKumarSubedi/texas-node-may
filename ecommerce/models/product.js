const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database-connection");

const Product = sequelize.define("product", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING,
  },
});

module.exports = { Product };
