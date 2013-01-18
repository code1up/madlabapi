var assert = require("assert");
var request = require("request");
var requestex = require("./requestex");
var url = require("url");

var _keys = null;
var _maxAge = 3600; // seconds

function _configure(configuration) {
	assert.ok(configuration, "configuration");

	assert.ok(configuration.keys, "configuration.keys");
	assert.ok(configuration.keys.consumerKey, "configuration.keys.consumerKey");
	assert.ok(configuration.keys.consumerSecret, "configuration.keys.consumerSecret");

	_keys = configuration.keys;
	_maxAge = configuration.maxAge || _maxAge;

	return this;
}

function _exec(query, next) {
	assert.ok(_keys, "_keys");
	assert.ok(query, "query");
	assert.ok(next, "next");

	var endpoint = url.format({
		protocol: "http",
		hostname: "query.yahooapis.com",
		pathname: "/v1/public/yql",
		query: {
			q: query,
			format: "json",
			// ck: _keys.consumerKey,
			// cs: _keys.consumerSecret,
			_maxage: _maxAge
		}
	});

	var options = {
		url: endpoint,
		json: true
	};

	request(options, function(error, response, body) {
		requestex.handleResponse(error, response, body, next);
	});
}

// Exports.
exports.configure = _configure;
exports.exec = _exec;
