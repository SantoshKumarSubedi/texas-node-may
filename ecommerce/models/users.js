const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database-connection");

const User = sequelize.define("user", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    type: DataTypes.STRING,
  },

  email: {
    type: DataTypes.STRING,
  },

  // 0 for customer 1 for admin
  user_type: {
    type: DataTypes.INTEGER,
  },

  password: {
    type: DataTypes.STRING,
  },

  profile_picture: {
    type: DataTypes.STRING,
  },
});

module.exports = { User };
