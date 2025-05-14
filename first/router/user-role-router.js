const express = require("express");
const { createUserRole } = require("../controller/user-role-controller");
const userRoleRouter = express.Router();

userRoleRouter.post("/user-role/create", createUserRole);
module.exports = { userRoleRouter };
