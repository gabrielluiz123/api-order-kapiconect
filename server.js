const http = require("http");
require("./src/database/mongo.db");
const app = require("./src/app");
const port = process.env.PORT || 3000;
const server = http.createServer(app);
require("dotenv").config();

server.listen(port);