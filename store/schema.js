var mongoose = require("mongoose");
var store = require("./store");

var eventSchemaOptions = {
	collection: "events"
};

var eventSchema = new mongoose.Schema({
	uid: String,
	
	startDateTime: Date,
	endDateTime: Date,

	duration: Number,
	durationUnits: String,

	location: String,

	summary: String,
	description: String
}, eventSchemaOptions);

exports.Event = store.db.model("Event", eventSchema);
