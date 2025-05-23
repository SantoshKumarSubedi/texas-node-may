const { User, Product } = require("../models");
const { sendMail } = require("../service/node-mailer.service");
const { productCategory } = require("./product.controller");

const customerRegistration = async (req, res) => {
  const { name, email } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.render("customer-registration", {
      error: "Email Already Exist",
    });
  }
  const password = "Test@123"; //TODO Generate Random Password HEre And Hash password
  const newUser = User.build({ name, email, password, user_type: 0 });
  await newUser.save();
  sendMail(
    email,
    `Your password is ${password}`,
    "Account Create Successfully"
  );
  res.redirect("login");
};

const getCustomerRegistration = (req, res) => {
  res.render("customer-registration", { layout: false });
};

const getLogin = (req, res) => {
  res.render("login", { layout: false });
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  let error = "";
  if (user) {
    if ((user.password = password)) {
      req.session.userId = user.id;
      req.session.isAuthenticated = true;
      req.session.save();
      if (user.user_type == 0) {
        return res.redirect("/");
      } else {
        return res.redirect("/admin/dashboard");
      }

      //login Success
    } else {
      error = "Username Password don't Match";
    }
  } else {
    error = "Username Password don't Match";
  }
  res.render("login", { layout: false, error });
};

const getCustomerDashboard = async (req, res) => {
  const { userId } = req.session;
  const user = await User.findOne({ where: { id: userId } });
  const products = await Product.findAll({ raw: true });
  res.render("customer/dashboard", {
    user: { name: user.name },
    products,
    category: productCategory,
    layout: "customer",
  });
};

const getDashboard = async (req, res) => {
  const { userId } = req.session;
  const user = await User.findOne({ where: { id: userId } });
  res.render("customer/dashboard", { user: { name: user.name } });
};

const viewCustomers = async (req, res) => {
  const customers = await User.findAll({
    where: { user_type: 0 },
    attributes: ["id", "name", "email"],
    raw: true,
  });
  res.render("customer/customer-view", { customers });
};

const deleteCustomers = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.redirect("/customer");
};

const logout = (req, res) => {
  req.session.userId = null;
  req.session.isAuthenticated = false;
  res.redirect("/login");
};

module.exports = {
  customerRegistration,
  getCustomerRegistration,
  getLogin,
  handleLogin,
  getDashboard,
  getCustomerDashboard,
  viewCustomers,
  deleteCustomers,
  logout,
};
