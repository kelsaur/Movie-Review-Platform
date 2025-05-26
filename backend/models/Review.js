const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	movieId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Movie",
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	rating: {
		type: Number,
		required: [true, "You need to provide a rating"],
	},
	comment: {
		type: String,
		required: false,
		maxlength: 300,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Review", reviewSchema);
