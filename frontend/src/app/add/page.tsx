"use client"
import {useEffect, useState} from "react";
import axios from 'axios';

export default  function Add() {
    const [type, setType] = useState('artist');
    const [name, setName] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [songLength, setSongLength] = useState('');
    const [artistId, setArtistId] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);

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
            if (type === 'artist') {
                await axios.post('http://localhost:5000/api/artists', { name });
            } else if (type === 'album') {
                await axios.post('http://localhost:5000/api/albums', { title: albumTitle, artistId });
            } else if (type === 'song') {
                await axios.post('http://localhost:5000/api/songs', { title: songTitle, length: songLength, albumId });
            }
            alert('Successfully added!');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item.');
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded text-black">
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                        <option value="song">Song</option>
                    </select>
                </div>
                {type === 'artist' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded text-black" />
                    </div>
                )}
                {type === 'album' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input type="text" value={albumTitle} onChange={(e) => setAlbumTitle(e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded text-black" />
                    </div>
                )}
                {type === 'album' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Artist</label>
                        <select value={artistId} onChange={(e) => setArtistId(e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded text-black">
                            <option value="">Select Artist</option>
                            {artists.map((artist) => (
                                <option key={artist.id} value={artist.id}>
                                    {artist.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {type === 'song' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input type="text" value={songTitle} onChange={(e) => setSongTitle(e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded text-black" />
                    </div>
                )}
                {type === 'song' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Length</label>
                        <input type="text" value={songLength} onChange={(e) => setSongLength(e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded text-black" />
                    </div>
                )}
                {type === 'song' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Album</label>
                        <select value={albumId} onChange={(e) => setAlbumId(e.target.value)} className="block w-full mt-1 p-2 border border-gray-300 rounded text-black">
                            <option value="">Select Album</option>
                            {albums.map((album) => (
                                <option key={album.id} value={album.id}>
                                    {album.title}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add</button>
            </form>
        </div>
    );
};
