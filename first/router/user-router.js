const express = require("express");
const {
  getAllUsers,
  createUser,
  getByUsername,
  updateUser,
  deleteUserByUsername,
} = require("../controller/user-controller");
const userRouter = express.Router({ mergeParams: true });
const ROUTE_PREFIX = "users";

userRouter.get(`/${ROUTE_PREFIX}`, getAllUsers);
userRouter.post(`/${ROUTE_PREFIX}`, createUser);
userRouter.get(`/${ROUTE_PREFIX}/:username`, getByUsername);
userRouter.put(`/${ROUTE_PREFIX}`, updateUser);
userRouter.delete(`/${ROUTE_PREFIX}`, deleteUserByUsername);

module.exports = { userRouter };
