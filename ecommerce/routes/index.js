const express = require("express");
const { customerRouter } = require("./customer.router");
const { userRouter } = require("./user.router");
const { productRouter } = require("./product.router");

const router = express.Router();
router.use(customerRouter);
router.use(userRouter);
router.use(productRouter);

module.exports = { router };
