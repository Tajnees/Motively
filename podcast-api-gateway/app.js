// app.js

const express = require('express');
const cors = require('cors');
const podcastRoutes = require('./routes/podcastRoute');
const errorHandler = require('./middlewares/errorHandler');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(rateLimiter);

// API Routes
app.use('/api/podcasts', podcastRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
