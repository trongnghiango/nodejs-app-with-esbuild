const logger = require("../../../utils/logger");
const { BadRequestError } = require("../core/ApiError");

const ValidationSource = {
  BODY: "body",
  HEADER: "headers",
  QUERY: "query",
  PARAM: "params",
};

const validator = (schema, source) => (req, res, next) => {
  logger.debug(`[Validation Format] ${JSON.stringify(req[source], null, 2)}`);

  try {
    const { error } = schema.validate(source ? req[source] : req);

    if (!error) return next();

    const { details } = error;
    const message = details
      .map((i) => i.message.replace(/['"]+/g, ""))
      .join(",");
    logger.error(`[Validation] ${req[source]}`);

    return next(new BadRequestError(message));
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  validator,
  ValidationSource,
};
