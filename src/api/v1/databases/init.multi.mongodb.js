const mongoose = require("mongoose");
const logger = require("../../../utils/logger");
require("dotenv").config();

const { db, env } = require("../../../config");

// config
const options = {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
mongoose.set("strictQuery", false);

function newConnection(uri) {
  const conn = mongoose.createConnection(uri, options);
  logger.debug(`MongoDb:: ${uri}`, {
    label: "DATABASE",
  });
  conn.on("connected", () => {
    // mongoose.set('debug', function (col, method, query, doc) {
    //   logger.debug(`Mongo Debug:: ${this.conn.name}:: ${col}, ${method}, ${JSON.stringify(query)}, ${JSON.stringify(doc)}`, { label: 'DATABASE' });
    // })
    logger.info(`MongoDb:: is connected!`, {
      label: "DATABASE",
    });
  });

  // If the connection throws an error
  conn.on("error", (err) => {
    logger.info(uri);
    logger.info(`Mongoose 'default' connection error: ${err}`, {
      label: "DATABASE",
    });
  });

  // When the connection is disconnected
  conn.on("disconnected", () => {
    logger.info(`Mongoose 'default' connection disconnected`, {
      label: "DATABASE",
    });
  });

  return conn;
}

const auth_conn = newConnection(db.authdburi);
const conn1 = newConnection(db.dburi);
const conn2 = newConnection(db.dburi);
logger.info(`${db.dburi}`, {
  label: "DATABASE",
});

module.exports = {
  auth_conn,
  conn2,
  conn1,
};
