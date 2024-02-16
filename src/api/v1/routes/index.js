const express = require("express");
// const Database = require('../../../../demo/dbs/init.mongo');

const { SuccessResponse } = require("../core/ApiResponse");

const {
  refreshToken,
  signIn,
  signUp,
} = require("../controllers/auth.controller");

const { putComment } = require("../controllers/comment.controller");
const { validateCommentInput } = require("../validators/comment.validator");
const {
  validateRegisterInput,
  validateSignIn,
} = require("../validators/auth.validator");

const Auth = require("../middleware/Auth");
const { _requiredRole } = require("../helpers/role");
const { validator, ValidationSource } = require("../helpers/validator");
const { checkSchema } = require("../validators/check.schema");
const logger = require("../../../utils/logger");
const { loginSchema } = require("../validators/auth.schema");
const asyncHandler = require("../helpers/asyncHandler");

// main router v1;
const router = express.Router();

/**
 * GET method
 * @path("/checkhealth")
 */
router.get("/checkhealth", async (req, res) => {
  new SuccessResponse("success", { msg: "OK con dê!!" }).send(res);
});

/**
 *  Router: auth
 */
router.use("/auth", require("./auth.route"));

router.get(
  "/auth/refreshtoken",
  Auth.authentication,
  asyncHandler(refreshToken)
);

/**
 * Router: user
 */
router.get(
  "/me",
  Auth.authentication,
  _requiredRole("ADMIN"),
  Auth.checkRole,
  validator(checkSchema),
  (req, res) => {
    logger.info(req.currentRoleCodes);
    res.json({
      status: "success",
      msg: "OK",
      data: {},
    });
  }
);

/**
 * Router: comment
 */
router.post("/comment", validateCommentInput, putComment);

/**
 * Router: agent
 */
router.use("/agent", require("./agent.route"));

/**
 * Router: point
 */
router.use("/point", require("./point.route"));

/**
 * Router: transaction
 */
router.use("/transaction", require("./transaction.route"));

/**
 * Router: for Admin
 */
// router.post('/admin/putrole', validateCreateRoleInput, addRoleHanddler);

// router.delete('/admin/role/delete/:role_id', deleteRoleHandler);

router.use("/roles", require("./role.route"));
router.use("/admin", require("./admin.route"));
// router.use('/user', require('./user.route'));

module.exports = router;
