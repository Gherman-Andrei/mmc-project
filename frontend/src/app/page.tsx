'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Autosuggest, { SuggestionsFetchRequestedParams } from 'react-autosuggest';
import Link from 'next/link';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function Home() {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);

    const [searchArtist, setSearchArtist] = useState('');
    const [searchAlbum, setSearchAlbum] = useState('');
    const [searchSong, setSearchSong] = useState('');

    const [artistSuggestions, setArtistSuggestions] = useState([]);
    const [albumSuggestions, setAlbumSuggestions] = useState([]);
    const [songSuggestions, setSongSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [artistResponse, albumsResponse, songsResponse] = await Promise.all([
                    api.get('/api/artists'),
                    api.get('/api/albums'),
                    api.get('/api/songs')
                ]);
                setArtists(artistResponse.data);
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

    const onArtistSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
        onSuggestionsFetchRequested(params, setArtistSuggestions, artists, 'name');
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

    const getSuggestionValue = (suggestion: any) => suggestion.name;
    const renderSuggestion = (suggestion: any) => <div>{suggestion.name}</div>;

    const getAlbumSuggestionValue = (suggestion: any) => suggestion.title;
    const renderAlbumSuggestion = (suggestion: any) => <div>{suggestion.title}</div>;

    const getSongSuggestionValue = (suggestion: any) => suggestion.title;
    const renderSongSuggestion = (suggestion: any) => <div>{suggestion.title}</div>;

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchArtist.toLowerCase())
    );

    const filteredAlbums = albums.filter(album =>
        album.title.toLowerCase().includes(searchAlbum.toLowerCase())
    );

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchSong.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Music Library</h1>
                <Link href="/add">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Add
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Artist
                            <Autosuggest
                                suggestions={artistSuggestions}
                                onSuggestionsFetchRequested={onArtistSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => onSuggestionsClearRequested(setArtistSuggestions)}
                                getSuggestionValue={getSuggestionValue}
                                renderSuggestion={renderSuggestion}
                                inputProps={{
                                    placeholder: 'Search Artist',
                                    value: searchArtist,
                                    onChange: (e, { newValue }) => setSearchArtist(newValue)
                                }}
                                theme={{
                                    input: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                }}
                            />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Album
                            <Autosuggest
                                suggestions={albumSuggestions}
                                onSuggestionsFetchRequested={onAlbumSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => onSuggestionsClearRequested(setAlbumSuggestions)}
                                getSuggestionValue={getAlbumSuggestionValue}
                                renderSuggestion={renderAlbumSuggestion}
                                inputProps={{
                                    placeholder: 'Search Album',
                                    value: searchAlbum,
                                    onChange: (e, { newValue }) => setSearchAlbum(newValue)
                                }}
                                theme={{
                                    input: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                }}
                            />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            Song
                            <Autosuggest
                                suggestions={songSuggestions}
                                onSuggestionsFetchRequested={onSongSuggestionsFetchRequested}
                                onSuggestionsClearRequested={() => onSuggestionsClearRequested(setSongSuggestions)}
                                getSuggestionValue={getSongSuggestionValue}
                                renderSuggestion={renderSongSuggestion}
                                inputProps={{
                                    placeholder: 'Search Song',
                                    value: searchSong,
                                    onChange: (e, { newValue }) => setSearchSong(newValue)
                                }}
                                theme={{
                                    input: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                }}

                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredArtists.map(artist =>
                        filteredAlbums.filter(album => album.artistId === artist.id).map(album =>
                            filteredSongs.filter(song => song.albumId === album.id).map((song, index) => (
                                <tr key={`${artist.id}-${album.id}-${song.id}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{artist.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{album.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">{song.title}</td>
                                </tr>
                            ))
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
