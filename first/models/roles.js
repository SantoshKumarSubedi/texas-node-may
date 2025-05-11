const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database-connection");

const Role = sequelize.define("roles", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = { Role };
