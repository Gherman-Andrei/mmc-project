"use client"
import { useState } from "react";
import axios from 'axios';
import Link from "next/link";

export default function AddArtist() {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/artists', { name });
            alert('Artist successfully added!');
            setName('');
        } catch (error) {
            console.error('Error adding artist:', error);
            alert('Failed to add artist.');
        }
    };

    return (
        <div className="p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Artist</h1>
                <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Home
                    </button>
                </Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Artist
                </button>
            </form>
        </div>
    );
}