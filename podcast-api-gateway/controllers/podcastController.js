const podcastService = require('../services/podcastService');

exports.getPodcasts = async (req, res, next) => {
  try {
    const { search, title, categoryName, page, limit } = req.query;
    const podcasts = await podcastService.fetchPodcasts({ search, title, categoryName, page, limit });
    res.json(podcasts);
  } catch (error) {
    next(error);
  }
};
