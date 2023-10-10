const { Router } = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const {
  createRoleHandler,
  getRoleByIdHandler,
} = require("../controllers/admin.controller");
const Auth = require("../middleware/Auth");
const {
  validateCreatedRole,
  validateRoleId,
} = require("../validators/roles.validator");
const { _requiredRole } = require("../helpers/role");
const { validator, ValidationSource } = require("../helpers/validator");
const { createRoleSchema } = require("../validators/roles.schema");

const router = Router();

router.use(
  Auth.authentication,
  _requiredRole("ADMIN", "GUEST"),
  Auth.checkRole
); // xac thuc nguoi dung la ai?

router.post(
  "/create",
  // validateCreatedRole, //old not using
  validator(createRoleSchema, ValidationSource.BODY),
  createRoleHandler
);

router.get(
  "/:id",
  validateRoleId,
  _requiredRole("CUSTOMMER_CARE", "ADMIN"), // user phải có quyền 'GUEST' mới được phép truy xuất api này.
  asyncHandler(async (req, res, next) => Auth.checkRole(req, res, next)), // check
  getRoleByIdHandler
);

module.exports = router;
