/* eslint-disable no-unused-vars */
const logger = require("../../../utils/logger");
const { errorHandler } = require("./ApiResponse");

const ResponseStatus = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
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
};

class ApiError extends Error {
  /**
   * @param {string | undefined} type
   */
  constructor(type, message = "error") {
    super(type);
    this.type = type;
    this.message = message;
  }

  /**
   * @param {ApiError} err
   * @param {{ json: (arg0: { message: string; code: number; error: boolean; }) => void; }} res
   */
  static handle(err, res) {
    logger.info(`err -> ${err}`);
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
      case ErrorType.ACCESS_TOKEN:
        res.json(errorHandler(err.message, ResponseStatus.UNAUTHORIZED));
        break;
      case ErrorType.BAD_REQUEST:
        logger.info("BadRequestError");
        res.json(errorHandler(err.message, ResponseStatus.BAD_REQUEST));
        break;
      case ErrorType.FORBIDDEN:
        res.json(errorHandler(err.message, ResponseStatus.FORBIDDEN));
        break;
      default:
        res.json(errorHandler("LOI KHONG RO NGUYEN NHAN...."));
    }
  }
}

class AuthFailureError extends ApiError {
  constructor(message = "Invalid Credentials") {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

class InternalError extends ApiError {
  constructor(message = "Internal error") {
    super(ErrorType.INTERNAL, message);
  }
}

class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(ErrorType.BAD_REQUEST, message);
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Not Found") {
    super(ErrorType.NOT_FOUND, message);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = "Permission denied") {
    super(ErrorType.FORBIDDEN, message);
  }
}

class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}

class BadTokenError extends ApiError {
  constructor(message = "Token is not valid") {
    super(ErrorType.BAD_TOKEN, message);
  }
}

class TokenExpiredError extends ApiError {
  constructor(message = "Token is expired") {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}

class NoDataError extends ApiError {
  constructor(message = "No data available") {
    super(ErrorType.NO_DATA, message);
  }
}

class AccessTokenError extends ApiError {
  constructor(message = "Invalid access token") {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}

// class HttpError extends Error {
//   constructor(message, errorCode) {
//     super(message);
//     this.code = errorCode;
//   }
// }
// function MyError(message) {
//   this.name = 'MyError';
//   this.message = message;
//   this.stack = new Error().stack;
// }
// MyError.prototype = new Error();

module.exports = {
  // HttpError,
  // MyError,
  AccessTokenError,
  BadRequestError,
  BadTokenError,
  InternalError,
  AuthFailureError,
  ForbiddenError,
  NotFoundError,
  ApiError,
};
