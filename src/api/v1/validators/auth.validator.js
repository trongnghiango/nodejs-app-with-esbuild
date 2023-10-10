const Joi = require("joi");
const logger = require("../../../utils/logger");
const { BadRequestError } = require("../core/ApiError");
const { registerSchema, loginSchema } = require("./auth.schema");

/**
 * validateRegisterInput
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports.validateRegisterInput = (req, res, next) => {
  // sync interface data from body.
  logger.info(req.body);
  // const data = {...}
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    logger.error(`Error [validation]:: ${error}`);
    throw new BadRequestError(`[Validator error] :: ${error.message}`);
  }

  req.dataFilter = value;

  return next();
};

/**
 * validateSignIn
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports.validateSignIn = (req, res, next) => {
  //
  logger.info(`validating Sigin input`);
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    logger.info(`Error [validation]:: ${error}`);
    return next(new BadRequestError("value input login invalid!"));
  }

  req.dataFilter = value;

  return next();
};

const schemaUserCode = Joi.object({
  currentRoleCodes: Joi
    .array
    // Joi.string().alphanum().min(3).required(),
    (),
}).unknown();

module.exports.checkLoggedIn = (req, res, next) => {
  //
  logger.info(`validating currentRoleCodes`);
  const { error, value } = schemaUserCode.validate(req);
  if (error) {
    logger.info(`Error [validation]:: ${error}`);
    return next(new BadRequestError("checkLoggedIn invalid!"));
  }

  return next();
};
