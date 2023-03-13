const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { errorHandler } = require('./api/v1/core/ApiResponse');
// const passport = require('passport');
const apiV1 = require('./api/v1/routes');
const logger = require('./utils/logger');
const { ApiError } = require('./api/v1/core/http-error');

require('dotenv').config();
// require("./api/v1/databases/init.mongodb");
require('./api/v1/databases/init.multi.mongodb');

const { cookieKey, node_env, clientUrl } = require('../config/env.config');
// const { COOKIE_KEY, NODE_ENV, CLIENT_URL } = process.env;

// MY APP INITIAL IN HERE
const app = express();

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: [cookieKey],
    maxAge: 24 * 60 * 60 * 1000, // session will expire after 24 hours
    secure: node_env !== 'development',
    sameSite: node_env === 'development' ? false : 'none',
  })
);
app.use(bodyParser.json());

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport-twitter');

app.use(
  cors({
    origin: clientUrl, // allow to server to accept request from different origin (client)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/api/v1', apiV1);

app.get('/', (req, res) => {
  res.send('DEV.to is running');
});

// @ts-ignore
app.use((error, req, res, next) => {
  if (error instanceof ApiError) {
    logger.info(`ERROR:: ${JSON.stringify(error.message)}`);
    return ApiError.handle(error, res);
  }

  if (res.headerSent) {
    // res already sent ? => don't send res, just forward the error
    return next(error);
  }
  // else, send a res
  res.status(error.code || 500);

  return res.json(
    errorHandler(error.message || 'An unknown error occurred', error.code)
  );
});

module.exports = app;
