const Joi = require('joi');
const logger = require('../../../utils/logger');
const { BadRequestError } = require('../core/http-error');

const schema = Joi.object({
  isDEL: Joi.string().valid('NO', 'YES'),
  roleId: Joi.string().min(3).required(),
  code: Joi.string().min(3).required(),
  key: Joi.string().min(3).required(),
  description: Joi.string().allow(null).allow('').optional(),
  notes: Joi.string().allow(null).allow('').optional(),
});

const createRoleSchema = Joi.object({
  code: Joi.string().min(3).required(),
  key: Joi.string().min(3).required(),
  description: Joi.string().allow(null).allow('').optional(),
  notes: Joi.string().allow(null).allow('').optional(),
});

module.exports = {
  validateCreateRoleInput: (req, res, next) => {
    // validation req input
    logger.info(req.body);
    const { value, error } = schema.validate(req.body);
    if (error) {
      return next(new BadRequestError(error.message));
    }
    req.dataFilter = value;

    return next();
  },
  validateCreatedRole: (req, res, next) => {
    const { value, error } = createRoleSchema.validate(req.body);
    logger.info(`validateCreatedRole:: ${JSON.stringify({ error, value })}`);
    if (error) {
      return next(new BadRequestError(error.message));
    }
    req.dataFilter = value;

    return next();
  },
};
