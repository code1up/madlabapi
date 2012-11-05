var _ = require("underscore");
var assert = require("assert");
var ical = require("ical");
var moment = require("moment");
var request = require("request");
var requestex = require("./requestex");
var url = require("url");
var util = require("util");

function _getCalendar(next) {
	assert.ok(next, "next");

	var endpoint = url.format({
		protocol: "http",
		hostname: "madlab.org.uk",
		pathname: "?ical",
		query: {
		}
	});

	var options = {
		url: endpoint,
		json: false
	};

	request(options, function(error, response, body) {
		requestex.handleResponse(error, response, body, next);
	});
}

function _use(app) {
	app.get("/api/events", function(req, res) {
		_getCalendar(function(error, body) {
			assert.ok(body, "body");

			console.log(body);

			var calendar = ical.parseICS(body);
			var entries = [];

			console.dir(calendar);

			_.each(calendar, function(each) {
				var entry = {
					uid: each.uid,
					start: each.start,
					end: each.end,
					location: each.location && each.location.trim(),
					summary: each.summary && each.summary.trim(),
					description: each.description && each.description.val && each.description.val.trim()
				};

				entries.push(entry);
			});

			res.type("application/json");
			res.json(entries);
		});
	});
}

exports.use = _use;
