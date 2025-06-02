import mongoose from "mongoose";
import { genres } from "../utils/constants.js";

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
		enum: genres.map((g) => g.toLowerCase()),
	},
});

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
