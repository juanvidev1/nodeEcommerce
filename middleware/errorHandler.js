const logError = (error, req, res, next) => {
  console.log('logError')
  console.error(error);
  next(error); // Pass error to next middleware
}

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

const errorHandler = (error, req, res, next) => {  // It's important to define the 4 params (error, req, res, next) so the middleware gets that this is n error middleware
  console.log('errorHandler')
  res.status(500).json({
    message: error.message,
    stack: error.stack
  });
}

module.exports = { logError, errorHandler, boomErrorHandler };
