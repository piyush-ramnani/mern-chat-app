const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };

/* ---UNDERSTANDING THE CODE---
errorHandler checks if the current response status code (res.statusCode) is 200 (OK). If it is, it sets the status code to 500 (Internal Server Error); otherwise, it uses the existing status code. This is done to ensure that internal server errors are appropriately indicated.
*/
