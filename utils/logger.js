const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	cyan: "\x1b[36m",
};

module.exports.success = (...message) => {
	console.log(
		colors.cyan,
		`[${new Date().toLocaleTimeString()}] ${colors.green} INFO ${colors.reset}`,
		...message
	);
};

module.exports.error = (...message) => {
	console.log(
		colors.cyan,
		`[${new Date().toLocaleTimeString()}] ${colors.red} ERROR ${colors.reset}`,
		...message
	);
};

module.exports.warning = (...message) => {
	console.log(
		colors.cyan,
		`[${new Date().toLocaleTimeString()}] ${colors.yellow} WARNING ${
			colors.reset
		}`,
		...message
	);
};

module.exports.test = (...message) => {
	console.log(
		colors.cyan,
		`[${new Date().toLocaleTimeString()}] ${colors.yellow} TEST ${
			colors.reset
		}`,
		...message
	);
};
