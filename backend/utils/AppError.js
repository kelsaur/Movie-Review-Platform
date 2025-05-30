export class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode; //convert statusCode to a string
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

		Error.captureStackTrace(this, this.constructor); //removes new AppError, shows only where the error comes from
	}
}
