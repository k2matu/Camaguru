const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tokenSchema = Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

tokenSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Token", tokenSchema);
