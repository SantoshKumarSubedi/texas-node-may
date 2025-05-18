const express = require("express");
const {
  getAllUsers,
  createUser,
  getByUsername,
  updateUser,
  deleteUserByUsername,
  login,
} = require("../controller/user-controller");
const { verifyRole } = require("../middleware/role-verify-middleware");
const userRouter = express.Router({ mergeParams: true });
const ROUTE_PREFIX = "users";

// Public routes
userRouter.post("/login", login);
userRouter.post(`/${ROUTE_PREFIX}`, verifyRole("ADMIN"), createUser);

// Protected routes
userRouter.get(`/${ROUTE_PREFIX}`, verifyRole("ADMIN"), getAllUsers);
userRouter.get(`/${ROUTE_PREFIX}/:username`, getByUsername);
userRouter.put(`/${ROUTE_PREFIX}`, updateUser);
userRouter.delete(`/${ROUTE_PREFIX}`, deleteUserByUsername);

module.exports = { userRouter };
