const { v4: uniqueID } = require("uuid");
const connection = require("../connection");
const bcrypt = require("bcrypt");
const { handleErrorResponse } = require("../../utils/methods");
const logger = require("../../utils/logger");
const unknownError = "Unknown Error, Please try again";

module.exports.createUser = (data) => {
	return new Promise((resolve, reject) => {
		try {
			const conn = connection.getInstance();
			const { name, email, password } = data;
			const id = uniqueID();
			const now = Date.now();
			const user = {
				id,
				name,
				email,
			};
			bcrypt
				.hash(password, 10)
				.then((securePassword) => {
					const query = {
						text: `INSERT INTO users (id, name, email, password, created_at, last_login) VALUES($1, $2, $3, $4, $5, $6)`,
						values: [id, name, email, securePassword, now, now],
					};
					conn.query(query, (err, res) => {
						if (err) {
							return reject(handleErrorResponse(err));
						}
						if (res.rowCount > 0) {
							return resolve({ user });
						}
						return reject(handleErrorResponse(unknownError));
					});
				})
				.catch((err) => {
					return reject(handleErrorResponse(err));
				});
		} catch (error) {
			return reject(error);
		}
	});
};

module.exports.loginUser = (data) => {
	return new Promise((resolve, reject) => {
		try {
			const conn = connection.getInstance();
			const { email, password } = data;
			const query = {
				text: `SELECT * FROM users WHERE email=$1`,
				values: [email],
			};
			const time = Date.now();
			conn.query(query, (err, res) => {
				if (err) {
					return reject(handleErrorResponse(err));
				}
				const { rowCount, rows } = res;
				if (rowCount === 0) {
					return reject(handleErrorResponse(unknownError));
				}
				const user = rows[0];
				const { password: userPassword, created_at } = user;
				bcrypt.compare(password, userPassword, function (err, result) {
					if (err) return reject(handleErrorResponse(err));
					if (!result) {
						return reject(handleErrorResponse("Invalid Password"));
					}
					delete user.password;
					user.last_login = time;
					user.created_at = parseInt(created_at);
					const query2 = {
						text: `UPDATE users SET last_login=$1 WHERE email=$2`,
						values: [time, email],
					};
					conn.query(query2);
					return resolve(user);
				});
			});
		} catch (error) {
			return reject(handleErrorResponse(error));
		}
	});
};
