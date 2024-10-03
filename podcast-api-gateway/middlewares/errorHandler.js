// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);  // Log error stack trace for debugging
  
    // Set status code (default to 500 for server errors)
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Server Error',
      // Optionally include stack trace in development for easier debugging
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  };
  
  module.exports = errorHandler;
  