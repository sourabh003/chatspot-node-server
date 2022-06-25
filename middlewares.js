const express = require("express");
const cors = require("cors");

module.exports = (app) => {
	app.use(
		cors({
			origin: "*",
		})
	);

	app.use(express.json());
};
