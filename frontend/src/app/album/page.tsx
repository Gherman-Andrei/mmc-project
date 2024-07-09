'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import Link from 'next/link';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function AlbumList() {
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    const [searchAlbum, setSearchAlbum] = useState('');
    const [searchSong, setSearchSong] = useState('');

    const [albumSuggestions, setAlbumSuggestions] = useState([]);
    const [songSuggestions, setSongSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [albumsResponse, songsResponse] = await Promise.all([
                    api.get('/api/albums'),
                    api.get('/api/songs'),
                ]);
                setAlbums(albumsResponse.data);
                setSongs(songsResponse.data);
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        };
        fetchData();
    }, []);

    const onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams, setSuggestions: (suggestions: any[]) => void, items: any[], property: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const suggestions = inputLength === 0 ? [] : items.filter(item =>
            item[property] && item[property].toLowerCase().includes(inputValue)
        );

        setSuggestions(suggestions);
    };

    const onAlbumSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
        onSuggestionsFetchRequested(params, setAlbumSuggestions, albums, 'title');
    };

    const onSongSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
        onSuggestionsFetchRequested(params, setSongSuggestions, songs, 'title');
    };

    const onSuggestionsClearRequested = (setSuggestions: (suggestions: any[]) => void) => {
        setSuggestions([]);
    };

    const getSuggestionValue = (suggestion: any) => suggestion.title;
    const renderSuggestion = (suggestion: any) => <div>{suggestion.title}</div>;

    const filteredAlbums = albums.filter(album =>
        album.title.toLowerCase().includes(searchAlbum.toLowerCase())
    );

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchSong.toLowerCase())
    );

    const theme = {
        container: 'relative',
        input: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
        suggestionsContainer: 'absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg',
        suggestionsList: 'max-h-60 overflow-auto',
        suggestion: 'cursor-pointer',
        suggestionHighlighted: 'bg-gray-200'
    };

    return (
        <div className="p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Album List</h1>
                </div>
                <div className="relative">
                    <Link href="/album/add">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Add Album
                        </button>
                    </Link>
                    <Link href="/">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">
                            Home
                        </button>
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Album
                            <Autosuggest
                                suggestions={albumSuggestions}
                                onSuggestionsFetchRequested={onAlbumSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => onSuggestionsClearRequested(setAlbumSuggestions)}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={{
                                    placeholder: 'Search Album',
                                    value: searchAlbum,
                                    onChange: (e, { newValue }) => setSearchAlbum(newValue)
                                }}
                                theme={theme}
                            />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Song
                            <Autosuggest
                                suggestions={songSuggestions}
                                onSuggestionsFetchRequested={onSongSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => onSuggestionsClearRequested(setSongSuggestions)}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={{
                                    placeholder: 'Search Song',
                                    value: searchSong,
                                    onChange: (e, { newValue }) => setSearchSong(newValue)
                                }}
                                theme={theme}
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredAlbums.map(album => {
                        const albumSongs = filteredSongs.filter(song => song.albumId === album.id);
                        if (albumSongs.length === 0) {
                            return (
                                <tr key={album.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        <Link href={`/album/${album.id}`}>
                                            {album.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">No songs</td>
                                </tr>
                            );
                        } else {
                            return albumSongs.map(song => (
                                <tr key={`${album.id}-${song.id}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        <Link href={`/album/${album.id}`}>
                                            {album.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                        <Link href={`/song/${song.id}`}>
                                            {song.title}
                                        </Link>
                                    </td>
                                </tr>
                            ));
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}