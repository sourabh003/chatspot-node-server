const { createUser, loginUser } = require("../db/queries/users");

module.exports.userSignUp = (data) => {
	return createUser(data);
};

module.exports.userLogin = (data) => {
	return loginUser(data);
};
