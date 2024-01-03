export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.stauts = `${statusCode}`.startsWith("4") ? "error" : "fail";

    Error.captureStackTrace(this, this.constructor);
  }
}
