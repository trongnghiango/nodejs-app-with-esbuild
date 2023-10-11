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
  checkLoggedIn,
} = require("../validators/auth.validator");

const Auth = require("../middleware/Auth");
const { _requiredRole } = require("../helpers/role");
const { validator, ValidationSource } = require("../helpers/validator");
const { checkSchema } = require("../validators/check.schema");
const logger = require("../../../utils/logger");
const { loginSchema } = require("../validators/auth.schema");

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
router.post("/auth/signup", validateRegisterInput, signUp);
router.post(
  "/auth/signinwithusername",
  validator(loginSchema, ValidationSource.BODY),
  signIn
);
router.post("/auth/signin", validateSignIn, signIn);

router.get("/auth/refreshtoken", Auth.authentication, refreshToken);

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
 * Router: for Admin
 */
// router.post('/admin/putrole', validateCreateRoleInput, addRoleHanddler);

// router.delete('/admin/role/delete/:role_id', deleteRoleHandler);

router.use("/roles", require("./role.route"));
router.use("/admin", require("./admin.route"));
// router.use('/user', require('./user.route'));

module.exports = router;
