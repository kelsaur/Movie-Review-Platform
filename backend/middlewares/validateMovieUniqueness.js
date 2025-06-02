import Movie from "../models/Movie.js";
import { AppError } from "../utils/AppError.js";

export const validateMovieUniqueness = async (req, res, next) => {
	const { title } = req.body;

	try {
		const movieExists = await Movie.findOne({
			title: title.trim().toLowerCase(),
		});

		if (movieExists) {
			return next(new AppError("Movie already exists!", 400));
		}
		next();
	} catch (error) {
		next(error);
	}
};
