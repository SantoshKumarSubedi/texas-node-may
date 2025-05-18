const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("texas", "root", "P@ssw0rd", {
  host: "localhost",
  dialect: "mysql",
});

const databaseConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Db Connected Successfully");
    sequelize.sync(); // Sync Defined MOdel WIth DB
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sequelize, databaseConnect };
