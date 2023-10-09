const Joi = require("joi");
const logger = require("../../../utils/logger");
const { BadRequestError } = require("../core/ApiError");

const schema = Joi.object({
  isDEL: Joi.string().valid("NO", "YES"),
  roleId: Joi.string().min(3).required(),
  code: Joi.string().min(3).required(),
  key: Joi.string().min(3).required(),
  description: Joi.string().allow(null).allow("").optional(),
  notes: Joi.string().allow(null).allow("").optional(),
});

const createRoleSchema = Joi.object({
  code: Joi.string().min(3).required(),
  key: Joi.string().min(3).required(),
  description: Joi.string().allow(null).allow("").optional(),
  notes: Joi.string().allow(null).allow("").optional(),
});

const roleIdSchema = Joi.string().min(3).required();

module.exports = {
  /**
   * validateCreateRoleInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
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

  /**
   * validateRoleId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  validateRoleId: (req, res, next) => {
    const { error } = roleIdSchema.validate(req.params.id);
    if (error) {
      throw new BadRequestError(error.message);
    }
    next();
  },

  /**
   * validateCreatedRole
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  validateCreatedRole: (req, res, next) => {
    const { value, error } = createRoleSchema.validate(req.body);
    logger.info(`validateCreatedRole:: ${JSON.stringify({ error, value })}`);
    if (error) {
      throw new BadRequestError(error.message);
    }
    req.dataFilter = value;

    return next();
  },
};
