const rateLimit = require("express-rate-limit");
const {
  TooManyRequests,
  ApiError,
  ErrorType,
  InternalError,
} = require("./api/v1/core/ApiError");
const logger = require("./utils/logger");
const { env } = require("./config");

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 0.5 minute
  max: 10, // limit each IP to 12 requests per windowMs
  statusCode: 429,
  headers: true,
  keyGenerator(req) {
    return req.clientIp;
  },
  handler: (req, res, next) => {
    logger.info(`IP::: ${req.ip} <> ${req.ips}`);
    throw new TooManyRequests(
      "You sent too many requests. Please wait a while then try again"
    );
  },
});

// function catch and handle ERROR.
// eslint-disable-next-line consistent-return
const errorsHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    if (err.type === ErrorType.INTERNAL)
      logger.error(
        `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    logger.error(`[app]:${err}`);
    ApiError.handle(err, res);
  } else {
    logger.error(
      `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    if (env === "development") {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
};

module.exports = {
  apiRequestLimiter,
  errorsHandler,
};
