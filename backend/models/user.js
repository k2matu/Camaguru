const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
	},
	username: {
		type: String,
		unique: true,
		minLength: 1,
		required: true,
		validate: /^\w{1,30}$/,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		enum: ["Pending", "Active", "Modified"],
		default: "Pending",
	},
});

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model("User", userSchema);
