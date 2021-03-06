function _use(app, controller) {
	var assert = require("assert");

	assert.ok(app, "app");

	var _path = "/";

	app.get(_path, function(req, res) {
		assert.ok(req, "req");
		assert.ok(res, "res");

		var view = {
			controller: controller,
			path: _path,
			page: {
				title: "MadLab API",
				subtitle: "home"
			}
		};

		res.render("index", view);
	});
}

exports.use = _use;
