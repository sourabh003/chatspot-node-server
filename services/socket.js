const logger = require("../utils/logger");

module.exports = (io) => {
	logger.success("Sockets Working ✅");
	io.on("connection", (socket) => {
		logger.success("user connected");
	});
};
