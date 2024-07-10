'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useParams } from 'next/navigation';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function ArtistDetail() {
    const params = useParams();
    const artistId = params.artistId;
    const id = parseInt(artistId, 10);

    const [artist, setArtist] = useState(null);
    const [albums, setAlbums] = useState([]);
    const [deleted, setDeleted] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            if (!isNaN(id)) {
                try {
                    const [artistResponse, albumsResponse] = await Promise.all([
                        api.get(`/api/artists/${id}`),
                        api.get(`/api/artists/${id}/albums`)
                    ]);
                    setArtist(artistResponse.data);
                    setAlbums(albumsResponse.data);
                } catch (e) {
                    console.error('Error fetching data:', e);
                }
            } else {
                console.error('Invalid artist ID');
            }
        };
        fetchData();
    }, [id]);

    const handleDelete = async () => {
        try {
            await api.delete(`/api/artists/${id}`);
            setDeleted(true);
        } catch (e) {
            console.error('Error deleting artist:', e);
        }
    };

    if (!artist) {
        return <div>Loading...</div>;
    }
    if (deleted) {
        return (
            <div className="p-6 bg-gray-100">
                <p className="text-red-500">Artist deleted successfully.</p>
                <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Back to Home
                    </button>
                </Link>
            </div>
        );
    }


    return (
        <div className="p-6 bg-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{artist.name}</h1>
                <div>
                    <Link href={`/artists/${id}/edit`}>
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2">
                            Update
                        </button>
                    </Link>
                    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
            <p className="text-gray-600 mb-6">{artist.bio}</p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Albums</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {albums.map(album => (
                    <div key={album.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                        <Link href={`/album/${album.id}`}>
                            <h3 className="text-xl font-semibold text-blue-600 hover:underline">{album.title}</h3>
                        </Link>
                        <p className="text-gray-700 mt-2">{album.description}</p>
                    </div>
                ))}
            </div>

            {albums.length === 0 && (
                <p className="text-gray-600">No albums found for this artist.</p>
            )}

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
