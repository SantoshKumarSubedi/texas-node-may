const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database-connection");

const UserRole = sequelize.define("user_role", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  role_id: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { UserRole };
