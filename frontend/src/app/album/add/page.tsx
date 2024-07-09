"use client"
import { useState, useEffect } from "react";
import axios from 'axios';

export default function AddAlbum() {
    const [albumTitle, setAlbumTitle] = useState('');
    const [albumDescription, setAlbumDescription] = useState('');
    const [artistId, setArtistId] = useState('');
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/artists');
                setArtists(response.data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/albums', {
                title: albumTitle,
                description: albumDescription,
                artistId: parseInt(artistId)
            });
            alert('Album successfully added!');
            setAlbumTitle('');
            setAlbumDescription('');
            setArtistId('');
        } catch (error) {
            console.error('Error adding album:', error);
            alert('Failed to add album.');
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Album</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={albumTitle}
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        value={albumDescription}
                        onChange={(e) => setAlbumDescription(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Artist</label>
                    <select
                        value={artistId}
                        onChange={(e) => setArtistId(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    >
                        <option value="">Select Artist</option>
                        {artists.map((artist) => (
                            <option key={artist.id} value={artist.id}>
                                {artist.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Album
                </button>
            </form>
        </div>
    );
}