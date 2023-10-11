const Joi = require("joi");

const createRoleSchema = Joi.object({
  code: Joi.string().min(3).required(),
  key: Joi.string().min(3).required(),
  description: Joi.string().allow(null).allow("").optional(),
  notes: Joi.string().allow(null).allow("").optional(),
});

const roleIdSchema = Joi.object({ id: Joi.string().min(3).required() });

module.exports = {
  createRoleSchema,
  roleIdSchema,
};
