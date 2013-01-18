
var assert = require("assert");
var config = require("config");
var _ = require("underscore");

var _configuration = {
	keys: {
		consumerKey: config.yahoo.consumerKey,
		consumerSecret: config.yahoo.consumerSecret,
		applicationUrl: config.yahoo.applicationUrl,
		appDomain: config.yahoo.appDomain
	}
};

var yql = require("./yql").configure(_configuration);

	
function _getUpcomingEvents(next) {
	assert.ok(next, "next");

	var _parseResponse = function(error, response, body) {
		if (error) {
			// console.dir(error);
			next(error);

		} else {
			assert.ok(response, "response");
			console.dir(body);

			var events = [];

			_.each(body.query.results.li, function(result) {
				console.dir(result);

				events.push({
					id: result.id,
					date: result.a.strong,
					url: result.a.href,
					title: result.a.content
				});
			});

			console.dir(events);

			next(null, response, body);
		}
	};

	var xpath = "'//ul[@id=\"events-calendar-list\"]//li'";
	var query = "select * from html where url=\"http://madlab.org.uk\" and xpath=" + xpath;

	// xpath = xpath + " ck=\"dj0yJmk9ZFg2R2d6NG5KaGVVJmQ9WVdrOVdsRkVSMXBOTlRnbWNHbzlNakV3TURVM016VTJNZy0tJnM9Y29uc3VtZXJzZWNyZXQmeD1kOA\"";
	// xpath = xpath + " and cs=\"a86f43c4432dff187f5aef23431239e5100e6026\"";

	var response = yql.exec(query, _parseResponse);
}

exports.getUpcomingEvents = _getUpcomingEvents;
