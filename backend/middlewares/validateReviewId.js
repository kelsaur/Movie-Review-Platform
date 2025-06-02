import Review from "../models/Review.js";
import { AppError } from "../utils/AppError.js";

export const validateReviewId = async (req, res, next) => {
	const { id } = req.params;

	try {
		const review = await Review.findById(id);

		if (!review) {
			return next(new AppError("Review not found!", 404));
		}

		req.review = review;
		next();
	} catch (error) {
		next(error);
	}
};
