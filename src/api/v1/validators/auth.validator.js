const Joi = require('joi');
const logger = require('../../../utils/logger');
const { BadRequestError } = require('../core/http-error');

const registerSchema = Joi.object({
  userId: Joi.string().alphanum().min(3).max(16).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string().min(9).max(15),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  displayName: Joi.string().min(1).max(30),
  repeat_password: Joi.ref('password'),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  // eslint-disable-next-line prefer-regex-literals
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

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
    return next(new BadRequestError('value input login invalid!'));
  }

  req.dataFilter = value;

  return next();
};
