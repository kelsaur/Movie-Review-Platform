import Review from "../models/Review.js";
import { AppError } from "../utils/AppError.js";

export const getReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find().populate(
			"movieId userId",
			"title username"
		);
		res.status(200).json({ success: true, reviews });
	} catch (error) {
		next(error);
	}
};

export const addReview = async (req, res, next) => {
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

export const getReview = async (req, res, next) => {
	const review = req.review;

	try {
		const populatedReview = await review.populate(
			"movieId userId",
			"title username"
		);

		res.status(200).json({ success: true, review: populatedReview });
	} catch (error) {
		next(error);
	}
};

export const updateReview = async (req, res, next) => {
	const review = req.review;

	try {
		review.set({
			...(req.body.rating && { rating: req.body.rating }),
			...(req.body.comment && { comment: req.body.comment }),
		});

		const updatedReview = await review.save();

		res.status(200).json({
			success: true,
			message: "Review updated!",
			review: updatedReview,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteReview = async (req, res, next) => {
	const review = req.review;

	try {
		await review.deleteOne();

		res.status(200).json({
			success: true,
			message: "Review deleted!",
			review,
		});
	} catch (error) {
		next(error);
	}
};

export const getReviewsForMovie = async (req, res, next) => {
	const movie = req.movie; //movieID

	try {
		const reviews = await Review.find({ movieId: movie._id }).populate(
			"userId",
			"username"
		);

		if (!reviews.length) {
			return next(new AppError("No reviews found for this movie!", 404));
		}

		res.status(200).json({ success: true, reviews });
	} catch (error) {
		//console.error("Error in getReviewsForMovie:", error);
		next(error);
	}
};

export const getAverageRatingForMovies = async (req, res, next) => {
	//console.log("getAverageRatingForMovies hit!");
	try {
		const moviesWithRatings = await Review.aggregate([
			{
				$group: {
					_id: "$movieId",
					averageRating: { $avg: "$rating" },
				},
			},
			{
				$lookup: {
					// JOIN in SQL
					from: "movies",
					localField: "_id",
					foreignField: "_id",
					as: "movie",
				},
			},
			{ $unwind: "$movie" }, // writes out each movie as its own object not an array of movies
			{
				$project: {
					// pick out what columns to write from the object
					movieId: "$movie._id",
					title: "$movie.title",
					averageRating: "$averageRating",
				},
			},
		]);

		//console.log("Aggregation success!");
		res.status(200).json({ success: true, movies: moviesWithRatings });
	} catch (error) {
		console.log("Aggregation errror: ", error);
		next(error);
	}
};
