// Utility packages.
var util = require("util");

function _handleResponse(error, response, body, next) {
	var errorMessage;

	assert.ok(response, "response");
	assert.ok(body, "body");
	assert.ok(next, "next");

	if (error) {
		errorMessage = util.format("Failed with error: %j");

	} else if (!response) {
		errorMessage = "Failed with no response.";

	} else if (response.statusCode != 200) {
		errorMessage = util.format("Failed with status code %d.", response.statusCode);

	} else if (!body) {
		errorMessage = "Failed with no body.";

	}

	if (errorMessage) {
		next({
			message: errorMessage,
			error: error,
			response: response,
			body: body
		});

	} else {
		next(null, body);
	}
}

// Exports.
exports.handleResponse = _handleResponse;
