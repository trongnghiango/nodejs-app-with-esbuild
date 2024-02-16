/**
 * mongoose
 */
const mongoose = require("mongoose");
const logger = require("../../../utils/logger");
require("dotenv").config();

const { db } = require("../../../config");
const { getDbStr } = require("@/utils/str.util");

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
  conn.on("connected", () => {
    logger.info(`MongoDb[${getDbStr(uri)}]:: is connected!`, {
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

const agent_conn = newConnection(db.agentDbUri);
const transaction_conn = newConnection(db.transactionDbUri);
const point_conn = newConnection(db.pointDbUri);

module.exports = {
  auth_conn,
  conn2,
  conn1,
  agent_conn,
  point_conn,
  transaction_conn,
};
