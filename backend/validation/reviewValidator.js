import Joi from "joi";

export const addReviewSchema = Joi.object({
	movieId: Joi.string().length(24).hex().trim().required().messages({
		"string.base": "Movie ID must be a string!",
		"string.length": "Movie ID must be valid and 24 character hex string!",
		"string.hex": "Movie ID must be in hex format!",
		"string.empty": "Movie ID can't be empty!",
		"any.required": "Movie ID is required!",
	}),
	userId: Joi.string().length(24).hex().trim().required().messages({
		"string.base": "User ID must be a string!",
		"string.length": "User ID must be valid and 24 character hex string!",
		"string.hex": "User ID must be in hex format!",
		"string.empty": "User ID can't be empty!",
		"any.required": "User ID is required!",
	}),
	rating: Joi.number().min(1).max(5).required().messages({
		"number.base": "Rating must be a number!",
		"number.min": "Rating can't be less than 1",
		"number.max": "Rating can't be more than 5!",
		"any.required": "Rating is required!",
	}),
	comment: Joi.string().trim().max(300).messages({
		"string.base": "Comment must be a string!",
		"string.max": "Comment can't be longer than 300 characters long!",
	}),
});

export const updateReviewSchema = Joi.object({
	rating: Joi.number().min(1).max(5).messages({
		"number.base": "Rating must be a number!",
		"number.min": "Rating can't be less than 1",
		"number.max": "Rating can't be more than 5!",
	}),
	comment: Joi.string().trim().max(300).messages({
		"string.base": "Comment must be a string!",
		"string.max": "Comment can't be longer than 300 characters long!",
	}),
})
	.min(1)
	.messages({
		"object.min": "At least one field must be provided for update!",
	});
