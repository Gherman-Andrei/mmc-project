'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function Artists() {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [artistResponse, albumsResponse] = await Promise.all([
                    api.get('/api/artists'),
                    api.get('/api/albums')
                ]);
                setArtists(artistResponse.data);
                setAlbums(albumsResponse.data);
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Artists and Albums</h1>
            {artists.map(artist => (
                <div key={artist.id} className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">{artist.name}</h2>
                    <ul className="list-disc ml-6">
                        {albums.filter(album => album.artistId === artist.id).map(album => (
                            <li key={album.id} className="text-gray-600">{album.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
