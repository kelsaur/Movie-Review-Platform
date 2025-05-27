const express = require("express");
const router = express.Router();
const {
	getMovies,
	addMovie,
	getMovie,
	updateMovie,
	deleteMovie,
} = require("../controllers/movieController");

router.route("/").get(getMovies).post(addMovie);
router.route("/:id").get(getMovie).put(updateMovie).delete(deleteMovie);

module.exports = router;
