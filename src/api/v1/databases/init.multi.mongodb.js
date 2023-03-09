const mongoose = require('mongoose');
const logger = require('../../../utils/logger');
require('dotenv').config();

const { db } = require('../../../../config/env.config');

// config
const options = {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
// mongoose.set('strictQuery', false)

// connect instance
function newConnection(uri) {
  const conn = mongoose.createConnection(uri, options);

  conn.on('connected', function () {
    // mongoose.set('debug', function (col, method, query, doc) {
    //   logger.debug(`Mongo Debug:: ${this.conn.name}:: ${col}, ${method}, ${JSON.stringify(query)}, ${JSON.stringify(doc)}`, { label: 'DATABASE' });
    // })
    logger.info(`MongoDb:: [${this.name}] is connected!`, {
      label: 'DATABASE',
    });
  });

  // If the connection throws an error
  conn.on('error', (err) => {
    logger.info(`Mongoose 'default' connection error: ${err}`, {
      label: 'DATABASE',
    });
  });

  // When the connection is disconnected
  conn.on('disconnected', () => {
    logger.info(`Mongoose 'default' connection disconnected`, {
      label: 'DATABASE',
    });
  });

  return conn;
}

const conn1 = newConnection(db.dburi);

const conn2 = newConnection(
  `mongodb+srv://kaka:c8eM3KrT6X5pKW7@cluster0.gr4nd.mongodb.net/konking?retryWrites=true&w=majority`
);

// If the Node process ends, close the Mongoose connection
// process.on("SIGINT", () => {
//   conn1.close(true);
//   logger.info(
//     "Mongoose 'default' connection disconnected through app termination", { label: 'DATABASE' }
//   );
//   process.exit(1);
// });

module.exports = {
  conn1,
  conn2,
};
