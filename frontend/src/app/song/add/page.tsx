"use client"
import { useState, useEffect } from "react";
import axios from 'axios';
import Link from "next/link";

export default function AddSong() {
    const [songTitle, setSongTitle] = useState('');
    const [songLength, setSongLength] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/albums');
                setAlbums(response.data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        fetchAlbums();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/songs', {
                title: songTitle,
                length: songLength,
                albumId: parseInt(albumId)
            });
            alert('Song successfully added!');
            setSongTitle('');
            setSongLength('');
            setAlbumId('');
        } catch (error) {
            console.error('Error adding song:', error);
            alert('Failed to add song.');
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Song</h1>
                <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Home
                    </button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={songTitle}
                        onChange={(e) => setSongTitle(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Length</label>
                    <input
                        type="text"
                        value={songLength}
                        onChange={(e) => setSongLength(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Album</label>
                    <select
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    >
                        <option value="">Select Album</option>
                        {albums.map((album) => (
                            <option key={album.id} value={album.id}>
                                {album.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Song
                </button>
            </form>
        </div>
    );
}