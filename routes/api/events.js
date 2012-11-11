function _use(app) {
	var eventsapi = require("../../api/eventsapi");
	var assert = require("assert");

	assert.ok(app);

	app.get("/api/events", function(req, res) {
		assert.ok(req, "req");
		assert.ok(res, "res");

		eventsapi.getCalendar(function(error, calendar) {
			res.type("application/json");

			if (error) {
				res.json(error);
				return;
			}

			assert.ok(calendar, "calendar");
			res.json(calendar);
		});
	});
}

exports.use = _use;
