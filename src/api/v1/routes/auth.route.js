const { Router } = require("express");
const { validator, ValidationSource } = require("../helpers/validator");
const {
  validateRegisterInput,
  validateSignIn,
} = require("../validators/auth.validator");
const asyncHandler = require("../helpers/asyncHandler");
const { loginSchema } = require("../validators/auth.schema");
const { signIn, signUp } = require("../controllers/auth.controller");

const router = Router();

router.post("/signup", validateRegisterInput, asyncHandler(signUp));
router.post(
  "/signinwithusername",
  validator(loginSchema, ValidationSource.BODY),
  asyncHandler(signIn)
);
router.post("/signin", validateSignIn, asyncHandler(signIn));

module.exports = router;
