require("module-alias/register");

// eslint-disable-next-line import/no-unresolved, node/no-missing-require
require("dotenv").config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const {
  auth_conn,
  conn2,
  conn1,
  agent_conn,
  point_conn,
  transaction_conn,
} = require("./api/v1/databases/init.multi.mongodb");
const app = require("./app");
const logger = require("./utils/logger");
const { socketHandlers } = require("./utils/socket");


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
  auth_conn.close(true);
  agent_conn.close(true);
  point_conn.close(true);
  transaction_conn.close(true);
  io.close((error) => logger.error(`SOCKET.IO::${error.message}`));
  process.exit(0);
});
