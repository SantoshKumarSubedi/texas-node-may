const express = require("express");
const {
  getAllUsers,
  createUser,
  getByUsername,
  updateUser,
  deleteUserByUsername,
  login,
  uploadProfilePicture,
  getProfilePicture,
} = require("../controller/user-controller");
const { verifyRole } = require("../middleware/role-verify-middleware");
const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const fileHandler = multer({ storage: fileStorage });
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
userRouter.post(
  `/${ROUTE_PREFIX}/profile`,
  fileHandler.single("profilePicture"),
  uploadProfilePicture
);
userRouter.get(`/${ROUTE_PREFIX}/profile/get`, getProfilePicture);

module.exports = { userRouter };
