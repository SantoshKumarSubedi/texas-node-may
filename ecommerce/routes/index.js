const express = require("express");
const { customerRouter } = require("./customer.router");
const { userRouter } = require("./user.router");

const router = express.Router();
router.use(customerRouter);
router.use(userRouter);

module.exports = { router };
