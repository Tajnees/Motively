// app/components/PodcastList.js

"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from 'react';
import PodcastCard from './PodcastCard';
import Pagination from './Pagination';

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPodcasts();
  }, [search, page, limit]);

  const fetchPodcasts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/podcasts?search=${search}&page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched podcasts:', data);
      setPodcasts(data.data);

      const totalResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/podcasts?search=${search}`);
      const totalData = await totalResponse.json();
      setTotalPages(Math.ceil(totalData.data.length / limit));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search podcasts"
        value={search}
        onChange={handleSearchChange}
        className="border rounded p-2 m-2"
      />

      <select value={limit} onChange={handleLimitChange} className="border rounded p-2 m-2">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {podcasts.length === 0 && !loading && <p>No podcasts found.</p>}

      {/* Container for the grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.isArray(podcasts) && podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>

      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default PodcastList;
