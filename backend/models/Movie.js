const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	director: {
		type: String,
		required: true,
	},
	releaseYear: {
		type: Number,
		required: true,
		maxlength: 4,
	},
	genre: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Movie", movieSchema);
