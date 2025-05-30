import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const verifyUserCredentials = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email.trim().toLowerCase() });
		if (!user) {
			const error = new Error("User with this email doesn't exist!");
			error.statusCode = 401;
			return next(error);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			const error = new Error("Invalid password!");
			error.statusCode = 401;
			return next(error);
		}

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
