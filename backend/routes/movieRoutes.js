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
import { getReviewsForMovie } from "../controllers/reviewController.js";

const router = express.Router();

router
	.route("/")
	.get(getMovies)
	.post(validate(addMovieSchema), validateMovieUniqueness, addMovie);
router
	.route("/:id")
	.get(validateMovieId, getMovie)
	.put(validateMovieId, validate(updateMovieSchema), updateMovie)
	.delete(validateMovieId, deleteMovie);

router.get("/:id/reviews", validateMovieId, getReviewsForMovie);

export default router;
