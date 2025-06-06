import Movie from "../models/Movie.js";

export const getMovies = async (req, res, next) => {
	try {
		const movies = await Movie.find();
		res.status(200).json({ success: true, movies });
	} catch (error) {
		next(error);
	}
};

export const addMovie = async (req, res, next) => {
	//console.log("addMovie hit!");
	const { title, director, releaseYear, genre } = req.body;

	try {
		const newMovie = await Movie.create({
			title: title,
			director,
			releaseYear,
			genre,
		});

		res.status(201).json({ success: true, newMovie });
	} catch (error) {
		//console.error("Error in addmovie: ", error);
		next(error);
	}
};

export const getMovie = async (req, res, next) => {
	const movie = req.movie;

	try {
		res.status(200).json({ success: true, movie });
	} catch (error) {
		next(error);
	}
};

export const updateMovie = async (req, res, next) => {
	const movie = req.movie;

	try {
		movie.set({
			...(req.body.title && { title: req.body.title }),
			...(req.body.director && { director: req.body.director }),
			...(req.body.releaseYear && { releaseYear: req.body.releaseYear }),
			...(req.body.genre && { genre: req.body.genre }),
		});

		const updatedMovie = await movie.save();

		res
			.status(200)
			.json({ success: true, message: "Movie updated!", movie: updatedMovie });
	} catch (error) {
		console.error("Error in updateMovie: ", error);
		next(error);
	}
};

export const deleteMovie = async (req, res, next) => {
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
