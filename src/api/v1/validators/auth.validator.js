const Joi = require('joi');
const logger = require('../../../utils/logger');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref('password'),

  access_token: [Joi.string(), Joi.number()],

  birth_year: Joi.number().integer().min(1900).max(2013),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

module.exports.validateRegisterInput = (req, res, next) => {
  // sync interface data from body.
  logger.info(req.body);
  // const data = {...}
  // const {error, value} = registerSchema.validate();
  next();
};
