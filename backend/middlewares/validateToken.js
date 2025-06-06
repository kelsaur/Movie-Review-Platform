import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";

export const validateToken = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return next(new AppError("Not authorized! Token missing!", 401));
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.userId);

		if (!user) {
			return next(new AppError("User doesn't exist!", 401));
		}

		req.user = user;
		next();
	} catch (error) {
		next(new AppError("Invalid or expired token!", 401));
	}
};
