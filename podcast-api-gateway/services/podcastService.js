const mockData = require('../mock-api/mock-data');

exports.fetchPodcasts = async ({ search, title, categoryName, page, limit }) => {
  const query = { search, title, categoryName };
  const podcasts = mockData.getPodcasts(query);

  // Pagination logic
  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || podcasts.length; // Default to all if limit is not provided
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedPodcasts = podcasts.slice(startIndex, endIndex);

  return {
    total: podcasts.length,
    data: paginatedPodcasts,
  };
};
