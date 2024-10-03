require('dotenv').config();

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000/podcasts'
  : 'https://601f1754b5a0e9001706a292.mockapi.io/podcasts';

module.exports = {
  apiUrl: API_URL,
  rateLimit: {
    windowMs: 60 * 1000,
    max: 10
  }
};
