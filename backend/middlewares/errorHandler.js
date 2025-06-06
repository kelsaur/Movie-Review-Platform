import { AppError } from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
	if (err.name === "ValidationError") {
		return res.status(400).json({
			success: false,
			message: err.message,
		});
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			success: false,
			status: err.status,
			message: err.message,
		});
	}

	res.status(500).json({
		success: false,
		message: "Server error!",
	});
};
