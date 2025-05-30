import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
	const { username, email, password, role } = req.body;
	const saltRounds = 10;

	email = email.trim().toLowerCase();
	username = username.trim().toLowerCase();

	try {
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
			role,
		});

		res.status(201).json({
			success: true,
			message: "User registered successfully!",
			newUser,
		});
	} catch (error) {
		next(error);
	}
};

export const logIn = async (req, res, next) => {
	const user = req.user;

	try {
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN || "3h",
		});

		res.status(200).json({
			success: true,
			message: `Log in successful! Welcome ${user.username}`,
			token,
			user,
		});
	} catch (error) {
		next(error);
	}
};

export const allUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		res.status(200).json({ success: true, users });
	} catch (error) {
		next(error);
	}
};
