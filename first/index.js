const express = require("express");
const { DataTypes } = require("sequelize");
const { databaseConnect, sequelize } = require("./config/database-connection");
const { User } = require("./models/users");
const { router } = require("./router");
const app = express();
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("./middleware/auth-middleware");
const { requestLogger } = require("./middleware/logger-middleware");

//https://github.com/SantoshKumarSubedi/texas-node-may

app.use(express.json());
databaseConnect();

// Logger Middleware
app.use(requestLogger);

// Auth Middleware
app.use(authMiddleware);

app.use(router);

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server Started at port 3000....");
  }
});
