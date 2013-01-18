var assert = require("assert");
var express = require("express");
var request = require("request");
var _ = require("underscore");
var util = require("util");

var eventsapi = require("./api/events");

eventsapi.getUpcomingEvents(function(error, response) {
	///_.each(response.)
});

// Create Express app.
var app = express();

app.use(express.bodyParser());
app.use(app.router);

// Public.
app.use(express["static"](__dirname + "/public"));

// Views.
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

// TODO: Logging.
app.use(express.logger("dev"));

// Routes.
require("./routes/web/allroutes").use(app);
require("./routes/api/allroutes").use(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(util.format("Listening on %d.", port));
});
