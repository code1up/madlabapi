function _use(app) {
	var assert = require("assert");

	assert.ok(app, "app");

	app.get("/", function(req, res) {
		assert.ok(req, "req");
		assert.ok(res, "res");

		res.render("index", {
			page: {
				title: "MadLab",
				subtitle: "api",
				tag: "index"
			}
		});
	});
}

exports.use = _use;
