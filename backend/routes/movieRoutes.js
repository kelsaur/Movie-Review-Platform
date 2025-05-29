const express = require("express");
const router = express.Router();
const {
	validateMovieUniqueness,
} = require("../middlewares/validateMovieUniqueness");
const { validateMovieId } = require("../middlewares/validateMovieId");
const {
	getMovies,
	addMovie,
	getMovie,
	updateMovie,
	deleteMovie,
} = require("../controllers/movieController");

router.route("/").get(getMovies).post(validateMovieUniqueness, addMovie);
router
	.route("/:id")
	.get(validateMovieId, getMovie)
	.put(validateMovieId, updateMovie)
	.delete(validateMovieId, deleteMovie);

module.exports = router;
