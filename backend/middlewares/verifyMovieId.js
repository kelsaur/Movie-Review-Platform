const Movie = require("../models/Movie");

const verifyMovieId = async (req, res, next) => {
	const { id } = req.params;

	try {
		const movie = await Movie.findById(id);

		if (!movie) {
			const error = new Error("A movie with this ID doesn't exist!");
			error.statusCode = 404;
			return next(error);
		}

		req.movie = movie;
		next(); //!!!! DO NOT FORGET in case movie does exist !!!!
	} catch (error) {
		next(error);
	}
};

module.exports = verifyMovieId;
