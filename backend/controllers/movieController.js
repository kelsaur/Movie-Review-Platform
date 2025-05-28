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
		//****move to middleware file****
		const movieExists = await Movie.findOne({ title: title.toLowerCase() });

		if (movieExists) {
			const error = new Error("Movie already exists!");
			error.statusCode = 400;
			return next(error);
		}
		//****move to middleware file****

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

		//****move to middleware file****
		if (!movie) {
			const error = new Error("A movie with this ID doesn't exist!");
			error.statusCode = 404;
			return next(error);
		}
		//****move to middleware file****

		res.status(200).json({ success: true, movie });
	} catch (error) {
		next(error);
	}
};

exports.updateMovie = async (req, res, next) => {
	const { id } = req.params;
	const { title, director, releaseYear, genre } = req.body;

	try {
		const movie = await Movie.findById(id);

		//****move to middleware file****
		if (!movie) {
			const error = new Error("A movie with this ID doen't exist!");
			error.statusCode = 404;
			return next(error);
		}
		//****move to middleware file****

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
	const { id } = req.params;

	try {
		const movie = await Movie.findByIdAndDelete(id);

		//****move to middleware file****
		if (!movie) {
			const error = new Error("A movie with this ID doen't exist!");
			error.statusCode = 404;
			return next(error);
		}
		//****move to middleware file****

		res
			.status(200)
			.json({ success: true, message: "Movie deleted!", movie: deletedMovie });
	} catch (error) {
		next(error);
	}
};
