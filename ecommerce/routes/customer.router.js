const express = require("express");
const {
  customerRegistration,
  getCustomerRegistration,
  getLogin,
  handleLogin,
  getDashboard,
  viewCustomers,
  deleteCustomers,
  getCustomerDashboard,
  logout,
} = require("../controllers/customers.controller");

const customerRouter = express.Router();
customerRouter.post("/registration", customerRegistration);
customerRouter.get("/registration", getCustomerRegistration);
customerRouter.get("/login", getLogin);
customerRouter.post("/login", handleLogin);
customerRouter.get("/admin/dashboard", getDashboard);
customerRouter.get("/", getCustomerDashboard);
customerRouter.get("/customer", viewCustomers);
customerRouter.get("/customer/delete/:id", deleteCustomers);
customerRouter.get("/logout", logout);

module.exports = { customerRouter };
