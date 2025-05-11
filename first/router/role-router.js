const express = require("express");
const {
  getAllRole,
  getRoleById,
  createRole,
} = require("../controller/role-controller");

const roleRouter = express.Router();

const ROUTER_PREFIX = "/roles";

roleRouter.get(`${ROUTER_PREFIX}`, getAllRole);
roleRouter.get(`${ROUTER_PREFIX}/:id`, getRoleById);
roleRouter.post(`${ROUTER_PREFIX}`, createRole);

module.exports = { roleRouter };
