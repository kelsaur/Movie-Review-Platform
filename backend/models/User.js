const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Please provide a valid email"],
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("User", userSchema);
