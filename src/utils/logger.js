/* eslint-disable node/no-unsupported-features/es-syntax */
const { createLogger, transports, format } = require("winston");
const fs = require("fs");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");
require("dotenv").config();
const { winston } = require("../config/base.config");

const { combine, printf } = format;

const myFormat = printf(
  ({ level, message, timestamp, label = "SERVER" }) =>
    `[${timestamp}] [${label}] [${level}]: ${message}`
);

const timezoned = () =>
  new Date().toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });

let dir = "./logs";
if (!dir) dir = path.resolve("logs");

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

// const logLevel = process.env.NODE_ENV === "development" ? "debug" : "debug";
const logLevel = winston.level;

const options = {
  level: logLevel,
  filename: `${dir}/%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  timestamp: true,
  handleExceptions: true,
  humanReadableUnhandledException: true,
  prettyPrint: true,
  json: true,
  maxSize: "20m",
  colorize: true,
  maxFiles: "14d",
  format: combine(
    format.errors({ stack: true }),
    format.prettyPrint(),
    format.timestamp({ format: timezoned }),
    myFormat
  ),
};

module.exports = createLogger({
  transports: [
    // new transports.File(options),
    // new DailyRotateFile(options),
    new transports.Http({
      level: "warn",
      format: format.json(),
    }),
    new transports.Console({
      ...options,
      level: logLevel,
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.Console({
      ...options,
      level: "error",
      format: format.json(),
    }),
  ],
  exceptionHandlers: [
    // new DailyRotateFile(options),
    new transports.Console({
      ...options,
      level: "error",
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  exitOnError: false,
});

// module.exports = createLogger({
//   transports: [
//     new transports.Console({
//       level: logLevel,
//       format: combine(
//         format.errors({ stack: true }),
//         format.prettyPrint(),
//         format.timestamp({ format: timezoned }),
//         myFormat
//       ),
//     }),
//     new DailyRotateFile(options.file),
//   ],
//   exceptionHandlers: [new DailyRotateFile(options.file)],
//   exitOnError: false, // do not exit on handled exceptions
// });
