const express = require("express");
const {
  customerRegistration,
  getCustomerRegistration,
  getLogin,
  handleLogin,
  getDashboard,
  viewCustomers,
  deleteCustomers,
} = require("../controllers/customers.controller");

const customerRouter = express.Router();
customerRouter.post("/registration", customerRegistration);
customerRouter.get("/registration", getCustomerRegistration);
customerRouter.get("/login", getLogin);
customerRouter.post("/login", handleLogin);
customerRouter.get("/", getDashboard);
customerRouter.get("/customer", viewCustomers);
customerRouter.get("/customer/delete/:id", deleteCustomers);

module.exports = { customerRouter };
