import Movie from "../models/Movie.js";

export const validateMovieUniqueness = async (req, res, next) => {
	const { title } = req.body;

	try {
		const movieExists = await Movie.findOne({
			title: title.trim().toLowerCase(),
		});

		if (movieExists) {
			const error = new Error("Movie already exists!");
			error.statusCode = 400;
			return next(error);
		}
		next();
	} catch (error) {
		next(error);
	}
};
