const { user, host, database, password, port } = require("../utils/constants");

module.exports = (function () {
	const { Client } = require("pg");
	let instance;

	function createInstance() {
		const client = new Client({
			user,
			host,
			database,
			password,
			port,
		});
		client.connect();
		return client;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
	};
})();
