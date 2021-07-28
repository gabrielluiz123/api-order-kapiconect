const http = require("http");
require("./src/v1/database/mongo.db");
const app = require("./src/app");
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const logger = require("./src/utils/logger");

require("dotenv").config();

server.listen(PORT);
logger.info(`🚀 Application running on port: ${PORT}!`);