const Review = require("../models/Review");

exports.getReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find();
		res.status(200).json({ success: true, reviews });
	} catch (error) {
		next(error);
	}
};

exports.addReview = async (req, res, next) => {
	const { movieId, userId, rating, comment } = req.body;

	try {
		const newReview = await Review.create({
			movieId,
			userId,
			rating,
			comment,
		});

		res.status(201).json({ success: true, newReview });
	} catch (error) {
		next(error);
	}
};

exports.getReview = async (req, res, next) => {
	const { id } = req.params;

	try {
		const review = await Review.findById(id);

		//***!middleware - review not found!***

		res.status(200).json({ success: true, review });
	} catch (error) {
		next(error);
	}
};

exports.updateReview = async (req, res, next) => {
	const { id } = req.params;
	const { rating, comment } = req.body;

	try {
		const updatedReview = await Review.findByIdAndUpdate(
			id,
			{
				rating,
				comment,
			},
			{ new: true, runValidators: true }
		);

		//***!middleware - review not found!***

		res
			.status(200)
			.json({
				success: true,
				message: "Review updated!",
				review: updatedReview,
			});
	} catch (error) {
		next(error);
	}
};

exports.deleteReview = async (req, res, next) => {
	const { id } = req.params;

	try {
		const deletedReview = await Review.findByIdAndDelete(id);

		//***!middleware - review not found!***

		res.status(200).json({
			success: true,
			message: "Review deleted!",
			review: deletedReview,
		});
	} catch (error) {
		next(error);
	}
};
