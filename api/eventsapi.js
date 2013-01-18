var _ = require("underscore");
var assert = require("assert");
var ical = require("ical");
var moment = require("moment");
var request = require("request");
var requestex = require("./requestex");
var url = require("url");
var schema = require("../store/schema");

function _getRawCalendar(next) {
	assert.ok(next, "next");

	var endpoint = url.format({
		protocol: "http",
		hostname: "madlab.org.uk",
		pathname: "?ical",
		query: {
			// Empty (see pathname).
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
		var formatter = moment();

		// console.dir(calendar);

		_.each(calendar, function(each) {
			var duration = moment(each.end).diff(each.start, "hours");

			if (duration < 24) {
				durationUnits = duration <= 1 ? "hour" : "hours";

			} else {
				duration = moment(each.end).diff(each.start, "days") + 1;
				durationUnits = "days";
			}

			var event = new schema.Event({
				uid: each.uid,
				
				startDateTime: each.start,
				endDateTime: each.end,

				duration: duration,
				durationUnits: durationUnits,

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
			});
			
			// console.dir(event);
			events.push(event);

			/*
			var query = {
				uid: event.uid
			};

			var options = {
				upsert: true
			};

			schema.Event.findOneAndUpdate(query, event, options, function(error, newEvent) {
				if (error) {
					console.error("Failed to save event:");
					console.error("%j");
				} else {
					console.log("Saved event!");
				}	
			});
			*/
		});

		next(null, events);
	});
}

exports.getCalendar = _getCalendar;
