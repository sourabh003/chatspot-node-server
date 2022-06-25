const logger = require("./logger");

exports.handleErrorResponse = (error) => {
	const { message } = error;
	logger.error(error);
	if (message) return message;
	return error;
};
