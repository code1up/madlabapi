function _use(app) {
	var assert = require("assert");

	assert.ok(app, "app");

	app.get("/events", function(req, res) {
		assert.ok(req, "req");
		assert.ok(res, "res");

		res.render("events", {
			page: {
				title: "MadLab",
				subtitle: "events",
				tag: "events"
			}
		});
	});
}

exports.use = _use;
