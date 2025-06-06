export class AppError extends Error {
	// extends - subclass of Error class, inherits all Error features
	constructor(message, statusCode) {
		super(message); // super - need to call it to be able to pass custom messages AND access .this
		this.statusCode = statusCode;

		Error.captureStackTrace(this, this.constructor); //removes new AppError, shows only where the error comes from
	}
}
