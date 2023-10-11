const pjson = require("../../package.json");
require("dotenv").config();

const { NODE_ENV, PORT, MONGO_LOG, SECRET, FIREBASE, FIREBASE_VIEW } =
  process.env;

module.exports = {
  name: pjson.name,
  version: pjson.version,
  description: pjson.description,
  node_env: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "*",
  port: PORT || 3000,
  basicAuth: {
    users: { mcom: "mcom@123" },
  },
  winston: {
    db: MONGO_LOG || "",
    level:
      NODE_ENV === "production" ? "info" : process.env.LOG_LEVEL || "debug",
  },
  query: {
    limit: 10,
  },
  secretKey: SECRET || "HkQlTCrDfYWezqEp494TjDUqBhSzQSnn",
  timezone: "Asia/Ho_Chi_Minh",
  domain: `http://localhost:${PORT}` || 3000,
  firebase: JSON.parse(FIREBASE || "{}"),
  firebaseView: FIREBASE_VIEW,
  redis: {
    enable: false,
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASS,
  },
  chatbot: {
    host: process.env.CHATBOT_HOST || "https://bot-server.mcom.app",
  },
  domainName: process.env.DOMAIN_NAME || "http://localhost:5555",
  scheduler: {},
  tokenInfo: {
    accessTokenValidity: parseInt(
      process.env.ACCESS_TOKEN_VALIDITY_SEC || "0",
      10
    ),
    refreshTokenValidity: parseInt(
      process.env.REFRESH_TOKEN_VALIDITY_SEC || "0",
      10
    ),
    issuer: process.env.TOKEN_ISSUER || "",
    audience: process.env.TOKEN_AUDIENCE || "",
  },
  // logDirectory: process.env.LOG_DIR || "logs",
  logDirectory: "./logs",
  db: {
    name: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    port: process.env.DB_PORT || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_USER_PWD || "",
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5", 5),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10", 10),
    dburi: process.env.DB_URI || "",
    authdburi: process.env.AUTH_DB_URI || "",
  },
  cookieKey: process.env.COOKIE_KEY || "",
};
