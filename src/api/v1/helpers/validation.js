const Joi = require("joi");

const userValidate = (data) => {
  const userShema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(32).required(),
  });
  return userShema.validate(data)
}

module.exports = {
  userValidate,
  
}