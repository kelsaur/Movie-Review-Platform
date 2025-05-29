const Movie = require("../models/Movie");

const validateMovieUniqueness = async (req, res, next) => {
	const { title } = req.body;

	try {
		const movieExists = await Movie.findOne({ title: title.toLowerCase() });

		if (movieExists) {
			const error = new Error("Movie already exists!");
			error.statusCode = 400;
			return next(error);
		}
	} catch (error) {
		next(error);
	}
};

module.exports = { validateMovieUniqueness };
