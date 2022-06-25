const express = require("express");
const app = express();
const logger = require("./utils/logger");

// Middlewares
require("dotenv").config();
require("./middlewares")(app);

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	path: "/test",
	cors: "*",
});

// Routes
require("./routes")(app);

// Services
require("./services/socket")(io);

// Server Listener
http.listen(process.env.PORT || 4000, () => {
	logger.success("Server started ✅");
});
