const { createServer } = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const logger = require('./src/utils/logger');
const { socketHandlers } = require('./src/utils/socket');

require('dotenv').config();
// init mongo db
// require("./mongo");
const {
  PORT,
  CLIENT_URL,
} = process.env

const httpServer = createServer(app);

// socket io 
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});
socketHandlers(io);

httpServer.listen(PORT || 5000, () => {
  logger.info(`Starting server with port:: ${PORT}`);
});