const { Role, User, UserRole } = require("../models");
const createUserRole = async (req, res) => {
  const { userId, roleId } = req.body;
  const user = await User.findOne({ id: userId });
  if (!user) {
    res.json({ message: "User Not Found" });
    return;
  }
  const role = await Role.findOne({ id: roleId });
  if (!role) {
    res.json({ message: "Role not found" });
    return;
  }
  const existingUserRole = await UserRole.findOne({
    user_id: userId,
    role_id: roleId,
  });
  if (!existingUserRole) {
    const userRole = UserRole.build({ user_id: userId, role_id: roleId });
    await userRole.save();
  }
  res.json({ message: "User Role Created successfully" });
};

module.exports = { createUserRole };
