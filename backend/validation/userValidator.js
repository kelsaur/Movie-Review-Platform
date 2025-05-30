import Joi from "joi";

export const registerSchema = Joi.object({
	username: Joi.string().trim().min(5).max(50).required().messages({
		"string.empty": "YOu need to choose a username!",
		"string.min": "Username must be at least 5 characters long!",
		"string.max": "Username can't be longer than 50 characters!",
	}),
	email: Joi.string().email().trim().required().messages({
		"string.empty": "You need to provide an email!",
		"string.email": "You need to provide a valid email!",
	}),
	password: Joi.string().trim().min(8).required().messages({
		"string.empty": "You need to provide a password!",
		"string.min": "Password must be at least 8 characters long!",
	}),
	role: Joi.string().valid("user", "admin").optional(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().trim().required().messages({
		"string.empty": "You need to provide an email to log in!",
		"string.email": "You need to provide a valid email!",
	}),
	password: Joi.string().trim().required().messages({
		"string.empty": "You need to provide a password to log in!",
	}),
});
