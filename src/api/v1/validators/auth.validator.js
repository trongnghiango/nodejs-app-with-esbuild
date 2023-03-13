const Joi = require('joi');
const logger = require('../../../utils/logger');
const { BadRequestError } = require('../core/http-error');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),

  access_token: [Joi.string(), Joi.number()],

  birth_year: Joi.number().integer().min(1900).max(2013),

  email: Joi.string().email(),
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
  // const {error, value} = registerSchema.validate();
  next();
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
