const rateLimit = require('express-rate-limit');

// Define rate limit configuration
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1-minute window
  max: 1000000,                  // Limit each IP to 10000 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after a minute.'
  },
  headers: true              // Send X-RateLimit headers with the response
});

module.exports = limiter;
