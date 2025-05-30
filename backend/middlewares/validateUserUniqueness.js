import User from "../models/User.js";

export const validateUserUniqueness = async (req, res, next) => {
	const { email, username } = req.body;

	email = email.trim().toLowerCase();
	username = username.trim().toLowerCase();

	try {
		const userExists = await User.findOne({
			$or: [{ email }, { username: req.body.username }],
		});
		if (userExists) {
			const error = new Error("Email or username already in use!");
			error.statusCode = 400;
			return next(error);
		}

		next();
	} catch (error) {
		next(error);
	}
};
