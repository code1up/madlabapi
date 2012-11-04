var request = require("./request");
var requestresponse = require("./requestresponse");

var _keys = null;

function formatQuery(xpath) {
	var format = "%s AND xpath='%s'";

	// TODO: parameterize URL.
	var url = "SELECT * FROM html WHERE url='http://madlab.org.uk'";

	return util.format(format, url, xpath);
}

function parseResponse(error, response) {
	if (error) {
		console.dir(error);
		next(error);

	} else {
		console.dir(response);

		var placemark = response.Placemark[0];
		var point = placemark.Point;
		var coordinates = point.coordinates;

		next(null, {
			lat: coordinates[1],
			lng: coordinates[0]
		});
	}
}

function use(keys) {
	assert.ok(keys);
	_keys = keys;
}

function _exec(q) {
	assert.ok(_keys, "_keys");
	assert.ok(q, "q");

	var endpoint = url.format({
		protocol: "http",
		hostname: "query.yahooapis.com",
		// TODO: pathname: "/v1/public/yql",
		pathname: "/v1/yql",
		query: {
			q: q,
			format: "json",
			ck: keys.consumerKey,
			cs: keys.consumerSecret
		}
	});

	var options = {
		url: endpoint,
		json: true
	};

	request(options, function(error, response, body) {
		requestresponse.handleResponse(error, response, body, parseResponse);
	});
}

// Exports.
exports.use = use;
exports.exec = exec;
