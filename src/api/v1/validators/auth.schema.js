const Joi = require("joi");

const registerSchema = Joi.object({
  userId: Joi.string().alphanum().min(3).max(16).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().min(9).max(15),
  email: Joi.string().email().required(),
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  displayName: Joi.string().min(1).max(30),
  repeat_password: Joi.ref("password"),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
