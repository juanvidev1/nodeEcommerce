const logError = (error, req, res, next) => {
  console.log('logError')
  console.error(error);
  next(error); // Pass error to next middleware
}

const errorHandler = (error, req, res, next) => {  // It's important to define the 4 params (error, req, res, next) so the middleware gets that this is n error middleware
  console.log('errorHandler')
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

module.exports = { logError, errorHandler };
