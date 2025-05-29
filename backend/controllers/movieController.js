const Movie = require("../models/Movie");

exports.getMovies = async (req, res, next) => {
	try {
		const movies = await Movie.find();
		res.status(200).json({ success: true, movies });
	} catch (error) {
		next(error);
	}
};

exports.addMovie = async (req, res, next) => {
	const { title, director, releaseYear, genre } = req.body;

	try {
		const newMovie = await Movie.create({
			title,
			director,
			releaseYear,
			genre,
		});

		res.status(201).json({ success: true, newMovie });
	} catch (error) {
		next(error);
	}
};

exports.getMovie = async (req, res, next) => {
	const movie = req.movie;

	try {
		res.status(200).json({ success: true, movie });
	} catch (error) {
		next(error);
	}
};

exports.updateMovie = async (req, res, next) => {
	const movie = req.movie;
	const { title, director, releaseYear, genre } = req.body;

	try {
		//****need an update validation schema****/
		movie.set({ title, director, releaseYear, genre });
		const updatedMovie = await movie.save();
		//****need an update validation schema****/

		res
			.status(200)
			.json({ success: true, message: "Movie updated!", movie: updatedMovie });
	} catch (error) {
		next(error);
	}
};

exports.deleteMovie = async (req, res, next) => {
	const movie = req.movie;

	try {
		const deletedMovie = await Movie.deleteOne(movie);

		res
			.status(200)
			.json({ success: true, message: "Movie deleted!", movie: deletedMovie });
	} catch (error) {
		next(error);
	}
};
