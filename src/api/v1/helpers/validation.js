const Joi = require("joi");

const userValidate = (/** @type {any} */ data) => {
  const userShema = Joi.object({
    userId: Joi.string().min(3).max(16).required(),
    name: Joi.string().min(1).max(32).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
  });
  return userShema.validate(data);
};

module.exports = {
  userValidate,
};
