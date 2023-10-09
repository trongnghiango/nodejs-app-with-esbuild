const mongoose = require("mongoose");
const logger = require("../../../utils/logger");
const { db } = require("../../../config/base.config");

logger.info(JSON.stringify(db));
// Build the connection string
const dbURI = db.authdburi;
// 'mongodb+srv://kaka:c8eM3KrT6X5pKW7@cluster0.gr4nd.mongodb.net/booking?retryWrites=true&w=majority';
// const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${db.name}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
mongoose.set("strictQuery", false);

// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    logger.info("Mongoose connection done");
  })
  .catch((e) => {
    logger.info("Mongoose connection error");
    logger.info(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  logger.info("Mongoose default connection open");
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  logger.info(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  logger.info("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     logger.info(
//       'Mongoose default connection disconnected through app termination'
//     );
//     process.exit(0);
//   });
// });

module.exports = mongoose;
