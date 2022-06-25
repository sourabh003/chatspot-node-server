const express = require("express");
const { userSignUp, userLogin } = require("../controllers/users");
const router = express.Router();

router.post("/signup", (req, res) => {
	const { body } = req;
	userSignUp(body)
		.then((data) => {
			return res.status(200).json({
				success: true,
				data,
				message: "User Signup Success",
			});
		})
		.catch((err) => {
			return res.status(500).json({
				success: false,
				data: err,
				message: "User Signup Failed",
			});
		});
});

router.post("/login", (req, res) => {
	const { body } = req;
	userLogin(body)
		.then((data) => {
			return res.status(200).json({
				success: true,
				data,
				message: "User Login Success",
			});
		})
		.catch((error) => {
			return res.status(500).json({
				success: false,
				error,
				message: "User Login Failed",
			});
		});
});

module.exports = router;
