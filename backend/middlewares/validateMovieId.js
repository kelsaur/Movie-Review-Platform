import Movie from "../models/Movie.js";
import { AppError } from "../utils/AppError.js";

export const validateMovieId = async (req, res, next) => {
	const { id } = req.params;

	try {
		const movie = await Movie.findById(id);

		if (!movie) {
			return next(new AppError("A movie with this ID doesn't exist!", 404));
		}

		req.movie = movie;
		next(); //!!!! DO NOT FORGET in case movie does exist !!!!
	} catch (error) {
		next(error);
	}
};
