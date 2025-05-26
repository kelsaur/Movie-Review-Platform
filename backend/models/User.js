const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "You need to choose a username"],
		unique: true,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, "You need to provide an email"],
		unique: true,
		match: [/.+@.+\..+/, "Please provide a valid email"],
	},
	password: {
		type: String,
		required: [true, "You need to provide a password!"],
		minlength: 8,
	},
	role: {
		type: String,
		required: [true, "You need to pick a user role"],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);
