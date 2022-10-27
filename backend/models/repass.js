const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const repassSchema = Schema({
	code: {
		type: String,
		require: true,
		unique: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

repassSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("Repass", repassSchema);
