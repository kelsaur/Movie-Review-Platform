const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "You need to provide a title"],
	},
	director: {
		type: String,
		required: [true, "You need to provide a director"],
	},
	releaseYear: {
		type: Number,
		required: [true, "You need to provide the release year"],
		maxlength: 4,
	},
	genre: {
		type: String,
		required: [true, "You need to provide the genre"],
	},
});

module.exports = mongoose.model("Movie", movieSchema);
