const { User } = require("../models");

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
      return res.redirect("/");
      //login Success
    } else {
      error = "Username Password don't Match";
    }
  } else {
    error = "Username Password don't Match";
  }
  res.render("login", { layout: false, error });
};

const getDashboard = async (req, res) => {
  const { userId } = req.session;
  const user = await User.findOne({ where: { id: userId } });
  res.render("dashboard", { user: { name: user.name } });
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

module.exports = {
  customerRegistration,
  getCustomerRegistration,
  getLogin,
  handleLogin,
  getDashboard,
  viewCustomers,
  deleteCustomers,
};
