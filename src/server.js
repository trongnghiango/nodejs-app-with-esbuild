const { createServer } = require("http");
const { Server } = require("socket.io");
const { conn1, conn2 } = require("./api/v1/databases/init.multi.mongodb");
const app = require("./app");
const logger = require("./utils/logger");
const { socketHandlers } = require("./utils/socket");

require("dotenv").config();

const { PORT, CLIENT_URL } = process.env;

const httpServer = createServer(app);

// socket io
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});
socketHandlers(io);

// httpServer.setTimeout(10000, () => {
//   console.log('timeout');
//   io.destroy();
// });

httpServer.listen(PORT || 5000, () => {
  logger.info(`Starting server with port:: ${PORT}`);
});

process.on("SIGINT", () => {
  logger.error(`SOCKET.IO:: ${io}`);
  logger.error(`DB.Conn1::${conn1.id}`);
  logger.error(`DB.Conn2::${conn2.id}`);
  io.disconnectSockets(true);
  conn1.close(true);
  conn2.close(true);
  io.close((error) => logger.error(`SOCKET.IO::${error}`));
  process.exit(0);
});
