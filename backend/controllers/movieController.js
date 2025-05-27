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
	const { id } = req.params;

	try {
		const movie = await Movie.findById(id);

		//***!middleware - movie not found!***

		res.status(200).json({ success: true, movie });
	} catch (error) {
		next(error);
	}
};

exports.updateMovie = async (req, res, next) => {
	const { id } = req.params;
	const { title, director, releaseYear, genre } = req.body;

	try {
		const updatedMovie = await Movie.findByIdAndUpdate(
			id,
			{
				title,
				director,
				releaseYear,
				genre,
			},
			{ new: true, runValidators: true }
		);

		//***!middleware - movie not found!***

		res
			.status(200)
			.json({ success: true, message: "Movie updated!", movie: updatedMovie });
	} catch (error) {
		next(error);
	}
};

exports.deleteMovie = async (req, res, next) => {
	const { id } = req.params;

	try {
		const deletedMovie = await Movie.findByIdAndDelete(id);

		//***!middleware - movie not found!***

		res
			.status(200)
			.json({ success: true, message: "Movie deleted!", movie: deletedMovie });
	} catch (error) {
		next(error);
	}
};
