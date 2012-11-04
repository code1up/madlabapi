// Utility packages.
var util = require("util");

// Express and request.
var express = require("express");
var request = require("request");

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

// Hello World route.
app.get("/", function(req, res) {
	res.render("index", {
		title: "Welcome to the MadLab API",
		subtitle: "powered by Node.js"
	});
});

// API routes.
// var routes = require("./routes/api").app(app);

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log(util.format("Listening on %d.", port));
});

