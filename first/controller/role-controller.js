const { Role } = require("../models/roles");

const createRole = async (req, res) => {
  const { name, code } = req.body;
  const role = Role.build({ name, code });
  await role.save();
  res.json({ message: "Role Created Successfully" });
};

const getAllRole = async (req, res) => {
  const roles = await Role.findAll();
  res.json({ message: "Role Fetched Successfully", data: roles });
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  const role = await Role.findOne({ where: { id } });
  res.json({ message: "Role Fetched Successfully", data: role });
};

module.exports = { getAllRole, createRole, getRoleById };
