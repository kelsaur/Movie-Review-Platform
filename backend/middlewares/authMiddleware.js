import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";

export const verifyUserCredentials = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email.trim().toLowerCase() });
		if (!user) {
			return next(new AppError("User with this email doesn't exist!"), 401);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(new AppError("Invalid password!", 401));
		}

		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};
