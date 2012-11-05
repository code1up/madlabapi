var assert = require("assert");
var express = require("express");
var request = require("request");
var util = require("util");

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

// API Routes.
var api = require("./api/api").use(app);

app.get("/", function(req, res) {
	res.render("index", {
		page: {
			title: "MadLab",
			subtitle: "api",
			tag: "index"
		}
	});
});

app.get("/events", function(req, res) {
	res.render("events", {
		page: {
			title: "MadLab",
			subtitle: "events",
			tag: "events"
		}
	});
});

app.get("/pictures", function(req, res) {
	res.render("pictures", {
		page: {
			title: "MadLab",
			subtitle: "pictures",
			tag: "pictures"
		}
	});
});

app.get("/blog", function(req, res) {
	res.render("blog", {
		page: {
			title: "MadLab",
			subtitle: "blog",
			tag: "blog"
		}
	});
});

// API routes.
// var routes = require("./routes/api").app(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(util.format("Listening on %d.", port));
});
