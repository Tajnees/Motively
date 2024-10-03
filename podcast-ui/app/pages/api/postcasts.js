export default async function handler(req, res) {
  const { search, page, limit } = req.query;

  const apiUrl = `http://localhost:4000/api/podcasts?search=${search || ''}&page=${page || 1}&limit=${limit || 10}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
}
