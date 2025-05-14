const { User, UserRole, Role } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../config/database-connection");

const createUser = async (req, res) => {
  const { username, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!username || !name || !password) {
    res.send({ message: "Invalid Request Body" });
  } else {
    const user = User.build({ username, name, password: hashedPassword });
    await user.save();
    res.json({ message: "User Added Successfully" });
  }
};

const getAllUsers = async (req, res) => {
  const userList = await User.findAll();
  res.json({
    message: "User Fetched Successfully.",
    data: userList,
  });
};

const getByUsername = async (req, res) => {
  let { username } = req.params;
  let responseUser = await User.findOne({ where: { username: username } });
  if (responseUser) {
    res.json({ message: "User Fetched Successfully", data: responseUser });
  } else {
    res.json({ message: "User not found" });
  }
};

const updateUser = async (req, res) => {
  const { username, name } = req.body;
  let existingUser = await User.findOne({ where: { username: username } });
  if (existingUser) {
    existingUser.name = name;
    existingUser.save();
  } else {
    res.json({ message: "User Not Found" });
  }
};

const deleteUserByUsername = async (req, res) => {
  const { username } = req.params;
  let existingUser = await User.findOne({ where: { username: username } });
  if (existingUser) {
    existingUser.destroy();
  } else {
    res.json({ message: "User Not Found" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    const matchPassword = bcrypt.compare(password, existingUser.password);
    if (matchPassword) {
      const roles = await getRolesByUserId(existingUser.id);
      //TODO Generate TOKEN HERE
      const token = jwt.sign(
        { userId: existingUser.id, roles },
        "SecretTOKEN",
        {
          expiresIn: "1m",
        }
      );

      res.json({ message: "Login Successfull", data: { token } });
    } else {
      res.json({ message: "Username and password mismatched" });
    }
  } else {
    res.json({ message: "Username and password mismatched" });
  }
};

const getRolesByUserId = async (userId) => {
  const userRoles = await UserRole.findAll({ user_id: userId });
  const roles = [];
  for (const userrole of userRoles) {
    const role = await Role.findOne({ id: userrole.role_id });
    roles.push(role.code);
  }
  return roles;
};

module.exports = {
  createUser,
  getAllUsers,
  getByUsername,
  updateUser,
  deleteUserByUsername,
  login,
};
