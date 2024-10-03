const express = require('express');
const axios = require('axios');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const API_URL = 'https://601f1754b5a0e9001706a292.mockapi.io/podcasts';

// GraphQL schema
const schema = buildSchema(`
  type Podcast {
    id: ID
    title: String
    description: String
    categoryName: String
  }

  type Query {
    getPodcasts(search: String, title: String, categoryName: String, page: Int, limit: Int): [Podcast]
  }
`);

// Resolvers
const root = {
  getPodcasts: async ({ search, title, categoryName, page, limit }) => {
    try {
      const params = {};
      if (search) params.search = search;
      if (title) params.title = title;
      if (categoryName) params.categoryName = categoryName;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch podcasts');
    }
  },
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
