const Validator = require("fastest-validator");
const v = new Validator();

const movieSchema = {
	title: {
		type: "string",
		empty: false,
		min: 1,
		messages: {
			required: "You need to provide a title!",
			stringEmpty: "Title can't be empty!",
		},
	},
	director: {
		type: "string",
		empty: false,
		min: 1,
		messages: {
			required: "You need to provide a director!",
			stringEmpty: "Director can't be empty!",
		},
	},
	releaseYear: {
		type: "number",
		empty: false,
		min: 1878,
		max: 2100,
		messages: {
			required: "You need to provide a release year!",
		},
	},
	genre: {
		type: "string",
		empty: false,
		min: 1,
		messages: {
			required: "You need to provide a movie genre!",
			stringEmpty: "Genre can't be empty!",
		},
	},
};

const check = v.compile(movieSchema);

const validateMovie = (req, res, next) => {
	const result = check(req.body);

	if (result === true) return next();

	const error = new Error("Validation failed!");
	error.statusCode = 400;
	error.details = result;
	return next(error);
};

module.exports = { validateMovie };
