var _ = require("underscore");
var assert = require("assert");
var ical = require("ical");
var request = require("request");
var requestex = require("./requestex");
var url = require("url");

function _getRawCalendar(next) {
	assert.ok(next, "next");

	var endpoint = url.format({
		protocol: "http",
		hostname: "madlab.org.uk",
		pathname: "?ical",
		query: {
			// Empty.
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

function _getCalendar(next) {
	assert.ok(next, "next");

	_getRawCalendar(function(error, response, body) {
		if (error) {
			next(error);
			return;
		}

		assert.ok(response, "response");
		assert.ok(body, "body");

		var calendar = ical.parseICS(body);
		var events = [];

		console.dir(calendar);

		_.each(calendar, function(each) {
			var event = {
				uid: each.uid,
				
				start: each.start,
				end: each.end,

				location:
					each.location &&
					each.location.trim(),

				summary:
					each.summary &&
					each.summary.trim(),

				description:
					each.description &&
					each.description.val &&
					each.description.val.trim()
			};

			events.push(event);
		});

		next(null, events);
	});
}

exports.getCalendar = _getCalendar;
