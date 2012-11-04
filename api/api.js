function _use(app) {
	// Utility packages.
	var _ = require("underscore");
	var moment = require("moment");
	var util = require("util");

	app.get("/events2", function(req, res) {
		// var xpath = "//li[@id=\"text-5\"]";
		var xpath = "//h2[text()=\"Featured Events\"]/..//h3/*";

		// new YQL.exec("SELECT * FROM html WHERE url='http://madlab.org.uk' AND xpath='//li[@id=\"text-5\"]'", function(response) {
		(new YQL.exec(formatQuery(xpath), function(response) {

			console.log("YQL: %j", response);

			res.type("application/json");

			var json = [];

			_.each(response.query.results.a, function(a) {
				json.push({
					href: a.href,
					title: a.content
				});
			});

			res.json(json);
		}));
	});
}

exports.use = _use;
