function _use(app, controller) {
	var _ = require("underscore");
	var assert = require("assert");
	var eventsapi = require("../../api/eventsapi");
	var moment = require("moment");

	assert.ok(app, "app");

	var _path = "/events";

	app.get(_path, function(req, res) {
		assert.ok(req, "req");
		assert.ok(res, "res");

		eventsapi.getCalendar(function(error, calendar) {
			if (error) {
				res.render("error", error);
				return;
			}

			assert.ok(calendar, "calendar");

			// Compose the view.
			var view = {
				controller: controller,
				path: _path,
				page: {
					title: "MadLab API",
					subtitle: "events"
				},
				model: {
					calendar: []
				}
			};

			var dateFormat = "ddd D MMM YYYY h:mma";

			_.each(calendar, function(event) {
				view.model.calendar.push({
					startDateTimeString: moment(event.startDateTime).format(dateFormat),
					endDateTime: event.endDateTime,
					duration: event.duration,
					durationUnits: event.durationUnits,
					location: event.location,
					summary: event.summary
				});
			});

			res.render("events", view);
		});
	});
}

exports.use = _use;
