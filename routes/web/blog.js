function _use(app) {
	var assert = require("assert");

	assert.ok(app, "app");

	app.get("/blog", function(req, res) {
		assert.ok(req, "req");
		assert.ok(res, "res");

		res.render("blog", {
			page: {
				title: "MadLab",
				subtitle: "blog",
				tag: "index"
			}
		});
	});
}

exports.use = _use;
