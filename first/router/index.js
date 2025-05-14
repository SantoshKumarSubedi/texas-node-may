const express = require("express");
const { userRouter } = require("./user-router");
const { roleRouter } = require("./role-router");
const { userRoleRouter } = require("./user-role-router");
const router = express.Router();
router.use(userRouter);
router.use(roleRouter);
router.use(userRoleRouter);

module.exports = { router };
