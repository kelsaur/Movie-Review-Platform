import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";

export const validateUserUniqueness = async (req, res, next) => {
	let { email, username } = req.body;

	email = email.trim().toLowerCase();
	username = username.trim().toLowerCase();

	try {
		const userExists = await User.findOne({
			$or: [{ email }, { username: req.body.username }],
		});
		if (userExists) {
			return next(new AppError("Email or username already in use!", 400));
		}

		next();
	} catch (error) {
		next(error);
	}
};
