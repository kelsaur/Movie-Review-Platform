import express from "express";
import { validate } from "../middlewares/validate.js";
import {
	addReviewSchema,
	updateReviewSchema,
} from "../validation/reviewValidator.js";
import {
	getReviews,
	addReview,
	getReview,
	updateReview,
	deleteReview,
} from "../controllers/reviewController.js";
import { validateReviewId } from "../middlewares/validateReviewId.js";

const router = express.Router();

router.route("/").get(getReviews).post(validate(addReviewSchema), addReview);
router
	.route("/:id")
	.get(validateReviewId, getReview)
	.put(validateReviewId, validate(updateReviewSchema), updateReview)
	.delete(validateReviewId, deleteReview);

export default router;
