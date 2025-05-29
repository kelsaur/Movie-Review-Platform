const Validator = require("fastest-validator");

const v = new Validator();

const registerSchema = {
	username: {
		type: "string",
		empty: false,
		min: 5,
		max: 50,
		messages: {
			required: "You need to provide a username!",
			stringMin: "Username must be at least 5 characters long!",
			stringMax: "Username can't be longer than 50 characters!",
			stringEmpty: "Username can't be empty!",
		},
	},
	email: {
		type: "email",
		empty: false,
		messages: {
			required: "You need to provide an email!",
			email: "You need to provide a valid email!",
		},
	},
	password: {
		type: "string",
		empty: false,
		min: 8,
		messages: {
			required: "You need to provide a password!",
			stringMin: "Password must be at least 8 characters long!",
			stringEmpty: "Password can't be empty!",
		},
	},
	role: {
		type: "string",
		enum: ["user", "admin"],
		optional: true,
		messages: {
			enumValue: "Role must be either 'user' or 'admin'!",
		},
	},
};

const loginSchema = {
	email: {
		type: "email",
		empty: false,
		messages: {
			required: "You need to provide an email to log in!",
			email: "You need to provide a valid email!",
		},
	},
	password: {
		type: "string",
		empty: false,
		messages: {
			required: "You need to provide a password to log in!",
			stringEmpty: "Password can't be empty!",
		},
	},
};

const checkRegister = v.compile(registerSchema);
const checkLogin = v.compile(loginSchema);

const validateRegister = (req, res, next) => {
	const result = checkRegister(req.body);

	if (result === true) return next();

	const error = new Error("Validation failed!");
	error.statusCode = 400;
	error.details = result;
	return next(error);

	//return res.status(400).json({ errors: result });
};

const validateLogin = (req, res, next) => {
	const result = checkLogin(req.body);

	if (result === true) return next();

	const error = new Error("Validation failed!");
	error.statusCode = 400;
	error.details = result;
	return next(error);
};

module.exports = { validateRegister, validateLogin };
