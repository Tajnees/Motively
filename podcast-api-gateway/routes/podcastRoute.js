const express = require('express');
const podcastController = require('../controllers/podcastController');
const router = express.Router();

router.get('/', podcastController.getPodcasts);

module.exports = router;
