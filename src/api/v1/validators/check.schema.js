const Joi = require("joi");

module.exports.checkSchema = Joi.object({
  currentRoleCodes: Joi.array(),
}).unknown();

module.exports.checkSchema1 = Joi.array();
