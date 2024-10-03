"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from 'react';
import PodcastCard from './PodcastCard';
import Pagination from './Pagination';
import { toast } from 'react-toastify';

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

            // Fetch total podcasts for pagination
            const totalResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/podcasts?search=${search}`);
            const totalData = await totalResponse.json();
            setTotalPages(Math.ceil(totalData.data.length / limit));
        } catch (error) {
            setError(error.message);
            toast.error(`Error: ${error.message}`);
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
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search podcasts"
                    value={search}
                    onChange={handleSearchChange}
                    className="border rounded p-2 mr-2"
                />
            </div>

            <ul className="flex flex-wrap justify-center w-full">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {podcasts.length === 0 && !loading && <p>No podcasts found.</p>}
                {Array.isArray(podcasts) && podcasts.map((podcast) => (
                    <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
            </ul>

            <div className="flex justify-between w-full mt-4">
                <div className="flex items-center">
                    <label htmlFor="limit" className="mr-2">Podcasts per page:</label>
                    <select id="limit" value={limit} onChange={handleLimitChange} className="border rounded p-2">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default PodcastList;
