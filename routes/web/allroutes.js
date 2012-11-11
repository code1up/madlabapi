function _use(app) {
	var assert = require("assert");

	assert.ok(app, "app");

	require("./root").use(app);
	require("./events").use(app);
	require("./blog").use(app);
}

exports.use = _use;
