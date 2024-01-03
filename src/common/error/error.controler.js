export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  return res.status(res.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
