const express = require("express");
const { DataTypes } = require("sequelize");
const { databaseConnect, sequelize } = require("./config/database-connection");
const { User } = require("./models/users");
const { userRouter } = require("./router/user-router");
const app = express();

//https://github.com/SantoshKumarSubedi/texas-node-may

app.use(express.json());
databaseConnect();

// Logger Middleware
app.use((req, res, next) => {
  console.log(`Api ${req.url} Accessed At ${new Date()}`);
  if (["POST", "PUT"].includes(req.method)) {
    console.log(`API BODY: ${JSON.stringify(req.body)}`);
  }
  next();
});

// Auth Middleware
// app.use((req, res, next) => {
//   const headers = req.headers;
//   const token = headers["token"];
//   if (token) {
//     next();
//   } else {
//     // Allow Access For Login
//     const url = req.url;
//     if (["/login"].includes(url)) {
//       next();
//     } else {
//       res.send("Access Denied");
//     }
//   }
// });

app.use(userRouter);

app.listen(3000, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server Started at port 3000....");
  }
});
