import express from "express";
import { validateMovieUniqueness } from "../middlewares/validateMovieUniqueness.js";
import { validateMovieId } from "../middlewares/validateMovieId.js";
import {
	getMovies,
	addMovie,
	getMovie,
	updateMovie,
	deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.route("/").get(getMovies).post(validateMovieUniqueness, addMovie);
router
	.route("/:id")
	.get(validateMovieId, getMovie)
	.put(validateMovieId, updateMovie)
	.delete(validateMovieId, deleteMovie);

export default router;
