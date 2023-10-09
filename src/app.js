
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
// const { ExpressErrorHandler } = require('@acruzjr/express-http-errors');
const { errorHandler } = require('./api/v1/core/ApiResponse');
// const passport = require('passport');
const apiV1 = require('./api/v1/routes');
const logger = require('./utils/logger');
const { ApiError } = require('./api/v1/core/http-error');

require('dotenv').config();
// require("./api/v1/databases/init.mongodb");
require('./api/v1/databases/init.multi.mongodb');
// require('../demo/dbs/init.mongo');

const {
  cookieKey, env, db, clientUrl
} = require('./config');
// const { COOKIE_KEY, NODE_ENV, CLIENT_URL } = process.env;

// MY APP INITIAL IN HERE
const app = express();

logger.info(`Env:: ${db.authdburi}`);

// Middle init
app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: [cookieKey],
    maxAge: 24 * 60 * 60 * 1000, // session will expire after 24 hours
    secure: env !== 'development',
    sameSite: env === 'development' ? false : 'none'
  })
);
app.use(bodyParser.json());

// morgan setup
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport-twitter');

app.use(
  cors({
    origin: clientUrl, // allow to server to accept request from different origin (client)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true // allow session cookie from browser to pass through
  })
);
// end middle global

/**
 * API Version 1
 */
app.use('/api/v1', apiV1);

app.get('/', (req, res) => {
  res.send('DEV.to is running');
});

app.use(
  (
    /** @type {any} */ error,
    /** @type {any} */ req,
    /** @type {{ headerSent?: any; status?: any; json: any; }} */ res,
    /** @type {(arg0: any) => any} */ next
  ) => {
    logger.error(`[App] ERROR:: ${JSON.stringify(error.message)}`);
    if (error instanceof ApiError) {
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
  }
);

module.exports = app;
