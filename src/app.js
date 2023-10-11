const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
// const { ExpressErrorHandler } = require('@acruzjr/express-http-errors');
const { InternalErrorResponse } = require("./api/v1/core/ApiResponse");
// const passport = require('passport');
const apiV1 = require("./api/v1/routes");
const logger = require("./utils/logger");
const {
  ApiError,
  NotFoundError,
  InternalError,
  ErrorType,
  TooManyRequests,
} = require("./api/v1/core/ApiError");

require("dotenv").config();
// require("./api/v1/databases/init.mongodb");
require("./api/v1/databases/init.multi.mongodb");
// require('../demo/dbs/init.mongo');

const { cookieKey, env, db, clientUrl } = require("./config");
// const { COOKIE_KEY, NODE_ENV, CLIENT_URL } = process.env;

// MY APP INITIAL IN HERE
const app = express();

logger.info(`Env:: ${db.authdburi}`);

// Middle init
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: [cookieKey],
    maxAge: 24 * 60 * 60 * 1000, // session will expire after 24 hours
    secure: env !== "development",
    sameSite: env === "development" ? false : "none",
  })
);
app.use(bodyParser.json());

// morgan setup
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport-twitter');

app.use(
  cors({
    origin: clientUrl, // allow to server to accept request from different origin (client)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// Create the rate limit rule
const apiRequestLimiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 0.5 minute
  max: 10, // limit each IP to 12 requests per windowMs
  handler: (req, res, next) => {
    throw new TooManyRequests(
      "You sent too many requests. Please wait a while then try again"
    );
  },
});

// Use the limit rule as an application middleware
app.use(apiRequestLimiter);

// end middle global

/**
 * API Version 1
 */
app.use("/api/v1", apiV1);

app.get("/", (req, res) => {
  res.send("DEV.to is running");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  logger.error(new NotFoundError() instanceof ApiError);
  next(new NotFoundError("Not Found router"));
});

// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
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
});

module.exports = app;
