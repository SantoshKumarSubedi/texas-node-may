const { User } = require("../models/users");

const createUser = async (req, res) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    res.send({ message: "Invalid Request Body" });
  } else {
    const user = User.build({ username, name, password });
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

module.exports = {
  createUser,
  getAllUsers,
  getByUsername,
  updateUser,
  deleteUserByUsername,
};
