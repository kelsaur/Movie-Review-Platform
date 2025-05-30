import express from "express";
import {
	getReviews,
	addReview,
	getReview,
	updateReview,
	deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.route("/").get(getReviews).post(addReview);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

export default router;
