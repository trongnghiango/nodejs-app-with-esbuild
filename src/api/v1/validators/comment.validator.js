const Joi = require("joi");
const logger = require("../../../utils/logger");
const { BadRequestError } = require("../core/ApiError");

const schema = Joi.object({
  slug: Joi.string().min(3).max(16).required(),
  parent_slug: Joi.string().optional(),
  discuss_id: Joi.number(),
  isDEL: Joi.string().valid("NO", "YES"),
  text: Joi.string().min(1),
  author: Joi.object({
    name: Joi.string(),
    avt: Joi.string().allow(null).allow("").optional(),
  }),
});

module.exports = {
  /**
   * validateCommentInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  validateCommentInput: (req, res, next) => {
    // validation req input
    const { value, error } = schema.validate(req.body);
    logger.info("VALIDATIE RESULT::", { value });
    if (error) {
      return next(new BadRequestError(error.message));
    }
    return next();
  },
};
