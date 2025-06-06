import express from "express";
import { validate } from "../middlewares/validate.js";
import {
	addMovieSchema,
	updateMovieSchema,
} from "../validation/movieValidator.js";
import { validateMovieUniqueness } from "../middlewares/validateMovieUniqueness.js";
import { validateMovieId } from "../middlewares/validateMovieId.js";
import {
	getMovies,
	addMovie,
	getMovie,
	updateMovie,
	deleteMovie,
} from "../controllers/movieController.js";
import {
	getReviewsForMovie,
	getAverageRatingForMovies,
} from "../controllers/reviewController.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validateRole } from "../middlewares/validateRole.js";

const router = express.Router();

router
	.route("/")
	.get(getMovies)
	.post(
		validateToken,
		validateRole,
		validate(addMovieSchema),
		validateMovieUniqueness,
		addMovie
	);

router.route("/ratings").get(getAverageRatingForMovies);

router
	.route("/:id")
	.get(validateMovieId, getMovie)
	.put(
		validateToken,
		validateRole,
		validateMovieId,
		validate(updateMovieSchema),
		updateMovie
	)
	.delete(validateToken, validateRole, validateMovieId, deleteMovie);

router.route("/:id/reviews").get(validateMovieId, getReviewsForMovie);

export default router;
