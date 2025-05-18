const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database-connection");

const User = sequelize.define("user", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  profile_picture: {
    type: DataTypes.STRING,
  },
});

module.exports = { User };
