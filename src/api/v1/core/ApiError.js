const logger = require("../../../utils/logger");
const { env } = require("../../../config");
const {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} = require("./ApiResponse");

const ResponseStatus = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
};
const ErrorType = {
  BAD_TOKEN: "BadTokenError",
  TOKEN_EXPIRED: "TokenExpiredError",
  UNAUTHORIZED: "AuthFailureError",
  ACCESS_TOKEN: "AccessTokenError",
  INTERNAL: "InternalError",
  NOT_FOUND: "NotFoundError",
  NO_ENTRY: "NoEntryError",
  NO_DATA: "NoDataError",
  BAD_REQUEST: "BadRequestError",
  FORBIDDEN: "ForbiddenError",
  TOO_MANY_REQUESTS: "TooManyRequests",
};

class ApiError extends Error {
  // eslint-disable-next-line no-useless-constructor
  // constructor(type, message) {
  //   super(type, message);
  // }

  static handle(err, res) {
    logger.info(
      `---------------------------- ${err.name} ----------------------------`
    );
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(`${err.message} !!`).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(`${err.message}`).send(res);
      case ErrorType.BAD_REQUEST:
      case ErrorType.TOO_MANY_REQUESTS:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(`${err.message}`).send(res);
      default: {
        let { message } = err;
        // Do not send failure message in production as it may send sensitive data
        if (env === "production") message = "Something wrong happened.";
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(message);
    this.type = ErrorType.UNAUTHORIZED;
  }
}

class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(message);
    this.type = ErrorType.INTERNAL;
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message);
    this.type = ErrorType.BAD_REQUEST;
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(message);
    this.type = ErrorType.NOT_FOUND;
  }
}

class ForbiddenError extends ApiError {
  constructor(message = "Permission denied") {
    super(message);
    this.type = ErrorType.FORBIDDEN;
  }
}

class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(message);
    this.type = ErrorType.NO_ENTRY;
  }
}

class BadTokenError extends ApiError {
  constructor(message = "Token is not valid") {
    super(message);
    this.type = ErrorType.BAD_TOKEN;
  }
}

class TokenExpiredError extends ApiError {
  constructor(message = "Token is expired") {
    super(message);
    this.type = ErrorType.TOKEN_EXPIRED;
  }
}

class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(ErrorType.NO_DATA, message);
  }
}

class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token") {
    super(message);
    this.type = ErrorType.ACCESS_TOKEN;
  }
}

class TooManyRequests extends ApiError {
  constructor(message = "Too Many Requests") {
    super(message);
    this.type = ErrorType.TOO_MANY_REQUESTS;
  }
}

module.exports = {
  TokenExpiredError,
  NoDataError,
  AccessTokenError,
  BadRequestError,
  BadTokenError,
  InternalError,
  AuthFailureError,
  ForbiddenError,
  NotFoundError,
  NoEntryError,
  ApiError,
  ErrorType,
  TooManyRequests,
};
