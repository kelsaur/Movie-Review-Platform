export const validate = (schema) => async (req, res, next) => {
	try {
		//check that the incoming req.body matches schema, return ALL errors (abortEarly: false)
		const value = await schema.validateAsync(req.body, {
			abortEarly: false,
		});
		req.body = value;
		next();
	} catch (error) {
		error.statusCode = 400;
		error.details = error.details.map((e) => e.message); //cleaner output
		return next(error);
	}
};
