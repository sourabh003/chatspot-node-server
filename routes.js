const userRouter = require("./routers/users");
const logger = require("./utils/logger");

module.exports = (app) => {
	logger.success("Routes Working ✅");
	app.get("/", (req, res) => {
		res.send({
			success: true,
			message: "Working",
		});
	});
	app.use("/users", userRouter);
};
