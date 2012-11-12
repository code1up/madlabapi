var mongoose = require("mongoose");

var _connectionString = "mongodb://code1up:password@alex.mongohq.com:10025/madlabapi";

var _db = mongoose.createConnection(_connectionString, function(error) {
	if (error) {
		console.error("Mongoose connection error:");
		console.error("%j", error);		
	} else {
		console.log("Mongoose database connected.");
	}
});

_db.on("error", function(error) {
	console.error("Mongoose database error:");
	console.error("%j", error);
});

_db.once("open", function() {
	console.log("Mongoose database open.");
});

exports.db = _db;
