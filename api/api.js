var _ = require("underscore");
var assert = require("assert");
var ical = require("ical");
var moment = require("moment");
var request = require("request");
var requestresponse = require("./requestresponse");
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
		requestresponse.handleResponse(error, response, body, next);
	});
}

function _use(app) {
	app.get("/api/events2", function(req, res) {
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
