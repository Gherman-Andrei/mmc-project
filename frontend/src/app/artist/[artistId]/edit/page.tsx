"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "next/navigation";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function UpdateArtist({}) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [updated, setUpdated] = useState(false);
    const params = useParams();
    const artistId = params.artistId;
    const Id = parseInt(artistId, 10);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get(`/api/artists/${Id}`);
            setName(response.data.name);
            setLoading(false);
        } catch (e) {
            console.error('Error fetching artist:', e);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/artists/${Id}`, { name });
            setUpdated(true);
        } catch (e) {
            console.error('Error updating artist:', e);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (updated) {
        return (
            <div className="p-6 bg-gray-100">
                <p className="text-green-500">Artist updated successfully.</p>
                <button
                    onClick={() => window.history.back()}
                    className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Update Artist</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-800 font-bold mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none"
                        required
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Update Artist
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
