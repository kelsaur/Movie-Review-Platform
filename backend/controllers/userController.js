const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.registerUser = async (req, res, next) => {
	const { username, email, password, role } = req.body;
	const saltRounds = 10;

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

exports.logIn = async (req, res, next) => {
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

exports.allUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		res.status(200).json({ success: true, users });
	} catch (error) {
		next(error);
	}
};
