// eslint-disable-next-line node/no-unsupported-features/es-syntax
const { createLogger, transports, format } = require("winston");
const fs = require("fs");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");
require("dotenv").config();
const { winston } = require("../config/base.config");

const { combine, printf, align } = format;

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

const logLevel = "silly"; // process.env.NODE_ENV === "development" ? "debug" : "debug";
// const logLevel = winston.level;

const options = {
  level: logLevel,
  filename: `${dir}/%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  timestamp: true,
  handleExceptions: false,
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
    align(),
    myFormat
  ),
};

module.exports = createLogger({
  // transports: [
  //   new transports.File({
  //     name: "file.info",
  //     filename: "./logs/info.log",
  //     level: "info",
  //   }),
  //   new transports.File({
  //     name: "file.error",
  //     filename: "./logs/error.log",
  //     level: "error",
  //   }),
  // ],
  transports: [
    // new transports.File(options),
    new DailyRotateFile({
      ...options,
      name: "file.info",
      filename: `${dir}/%DATE%.log`,
      level: "info",
    }),
    new DailyRotateFile({
      ...options,
      name: "file.info",
      filename: `${dir}/%DATE%_error.log`,
      level: "error",
    }),
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
    new DailyRotateFile({
      ...options,
      level: "error",
      filename: `${dir}/%DATE%_error.log`,
      // handleExceptions: true,
    }),
    // new transports.Console({
    //   ...options,
    //   level: "error",
    //   format: format.combine(format.colorize(), format.simple()),
    //   handleExceptions: true,
    // }),
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
