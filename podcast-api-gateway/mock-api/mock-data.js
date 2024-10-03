const podcasts = [
  {
    id: "1",
    title: "The Daily",
    description: "A daily news podcast",
    categoryName: "News",
  },
  {
    id: "2",
    title: "The Joe Rogan Experience",
    description: "Long-form interviews",
    categoryName: "Comedy",
  },
  {
    id: "3",
    title: "Crime Junkie",
    description: "True crime stories",
    categoryName: "Crime",
  },
  {
    id: "4",
    title: "Science Vs",
    description: "Pitting facts against popular myths.",
    categoryName: "Science",
  },
  {
    id: "5",
    title: "Stuff You Should Know",
    description: "Learn about weird topics in a fun way.",
    categoryName: "Education",
  },
  {
    id: "6",
    title: "Armchair Expert",
    description: "Conversations about the messiness of being human.",
    categoryName: "Comedy",
  },
  {
    id: "7",
    title: "Unlocking Us",
    description: "Conversations that unlock the courage in each of us.",
    categoryName: "Personal Development",
  },
];

const getPodcasts = (query) => {
  let filteredPodcasts = podcasts;

  // Filter by search term across all podcast fields
  if (query.search) {
    filteredPodcasts = filteredPodcasts.filter((podcast) =>
      Object.values(podcast).some((value) =>
        value.toLowerCase().includes(query.search.toLowerCase())
      )
    );
  }

  // Filter by title
  if (query.title) {
    filteredPodcasts = filteredPodcasts.filter(
      (podcast) => podcast.title.toLowerCase() === query.title.toLowerCase()
    );
  }

  // Filter by categoryName
  if (query.categoryName) {
    filteredPodcasts = filteredPodcasts.filter(
      (podcast) =>
        podcast.categoryName.toLowerCase() === query.categoryName.toLowerCase()
    );
  }

  // Pagination support
  if (query.page && query.limit) {
    const page = parseInt(query.page, 10);
    const limit = parseInt(query.limit, 10);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    filteredPodcasts = filteredPodcasts.slice(startIndex, endIndex);
  }

  return filteredPodcasts;
};

module.exports = {
  getPodcasts,
};
