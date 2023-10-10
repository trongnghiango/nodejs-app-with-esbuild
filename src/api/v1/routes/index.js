const express = require("express");
// const Database = require('../../../../demo/dbs/init.mongo');

const { SuccessResponse } = require("../core/ApiResponse");

const {
  refreshToken,
  signIn,
  signUp,
} = require("../controllers/auth.controller");

const { signAccessToken, signRefreshToken } = require("../middleware/jwt");
const { putComment } = require("../controllers/comment.controller");
const { validateCommentInput } = require("../validators/comment.validator");
const {
  validateRegisterInput,
  validateSignIn,
} = require("../validators/auth.validator");

const {
  addRoleHanddler,
  deleteRoleHandler,
} = require("../controllers/admin.controller");
const { validateCreateRoleInput } = require("../validators/roles.validator");
const asyncHandler = require("../helpers/asyncHandler");
const Auth = require("../middleware/Auth");
const { _requireRole } = require("../helpers/role");

// main router v1;
const router = express.Router();

/**
 * GET method
 * @path("/checkhealth")
 */
router.get("/checkhealth", async (req, res) => {
  // Database.getInstance()
  const results = {
    status: "Ok",
  };
  new SuccessResponse("success", { results }).send(res);
});

/**
 *  Router: auth
 */
router.post("/auth/signup", validateRegisterInput, signUp);
router.post("/auth/signinwithusername", validateSignIn, signIn);
router.post("/auth/signin", validateSignIn, signIn);

router.get("/auth/refreshtoken", Auth.authentication, refreshToken);

/**
 * Router: user
 */
router.get("/me", (req, res) => {
  res.json({
    status: "success",
    msg: "OK",
    data: {},
  });
});

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
