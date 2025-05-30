import Joi from "joi";
import { genres } from "../utils/constants.js";

const currentYear = new Date().getFullYear();

export const addMovieSchema = Joi.object({
	title: Joi.string().trim().required().messages({
		"string.base": "Title must be a string!",
		"string.empty": "Title can't be empty!",
		"any.required": "Movie title is required!",
	}),
	director: Joi.string().trim().required().messages({
		"string.base": "Director must be a string!",
		"string.empty": "Director can't be empty!",
		"any.required": "Director is required!",
	}),
	releaseYear: Joi.number().min(1878).max(currentYear).required().messages({
		"number.base": "Release year must be a number!",
		"number.min": "Release year can't be before 1878",
		"number.max": "Release year can't be later than current year!",
		"any.required": "Release year is required!",
	}),
	genre: Joi.string()
		.trim()
		.lowercase()
		.valid(...genres.map((g) => g.toLowerCase()))
		.required()
		.messages({
			"any.only": `Genre must be one of: {#valids}`,
			"any.required": "Genre is required!",
		}),
});

export const updateMovieSchema = Joi.object({
	title: Joi.string().trim().messages({
		"string.base": "Title must be a string!",
		"string.empty": "Title can't be empty!",
	}),
	director: Joi.string().trim().messages({
		"string.base": "Director must be a string!",
		"string.empty": "Director can't be empty!",
	}),
	releaseYear: Joi.number().min(1878).max(currentYear).messages({
		"number.base": "Release year must be a number!",
		"number.min": "Release year can't be before 1878",
		"number.max": "Release year can't be later than current year!",
	}),
	genre: Joi.string()
		.trim()
		.lowercase()
		.valid(...genres.map((g) => g.toLowerCase()))
		.messages({
			"any.only": "Genre must be one of: {#valids}",
		}),
}) //req.body can't be empty
	.min(1)
	.messages({
		"object.min": "At least one field must be provided for update!",
	});
