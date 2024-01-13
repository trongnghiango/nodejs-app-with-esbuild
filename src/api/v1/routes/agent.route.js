const { Router } = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const Auth = require("../middleware/Auth");
const {
  validateCreatedRole,
  validateRoleId,
} = require("../validators/roles.validator");
const { _requiredRole } = require("../helpers/role");
const { validator, ValidationSource } = require("../helpers/validator");
const {
  createRoleSchema,
  roleIdSchema,
} = require("../validators/roles.schema");
const { getAgents } = require("../controllers/agent.controller");

const router = Router();

// router.use(
//   Auth.authentication,
//   _requiredRole("ADMIN", "GUEST"),
//   Auth.checkRole
// ); // xac thuc nguoi dung la ai?


router.get("/list", getAgents);

module.exports = router;
