'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useParams } from 'next/navigation';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function AlbumDetail() {
    const params = useParams();
    const albumId = params.albumId;
    const id = parseInt(albumId, 10);

    const [album, setAlbum] = useState(null);
    const [song, setSong] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!isNaN(id)) {
                try {
                    const [albumResponse, songResponse] = await Promise.all([
                        api.get(`/api/albums/${id}`),
                        api.get(`/api/albums/${id}/songs`)
                    ]);
                    setAlbum(albumResponse.data);
                    setSong(songResponse.data);
                } catch (e) {
                    console.error('Error fetching data:', e);
                }
            } else {
                console.error('Invalid album ID');
            }
        };
        fetchData();
    }, [id]);

    if (!album) {
        return <div className="p-6">Album not found.</div>;
    }

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{album.title}</h1>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{album.description}</p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Songs</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Length</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {song.map((song, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{song.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{song.length}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}