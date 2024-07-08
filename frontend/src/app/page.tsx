'use client';

import {useEffect, useState} from "react";
import axios from "axios";
import Autosuggest from 'react-autosuggest';

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

    const onSuggestionsFetchRequested = ({ value, setSuggestions, items }) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        const suggestions = inputLength === 0 ? [] : items.filter(item =>
            item.name && item.name.toLowerCase().includes(inputValue)
        );

        setSuggestions(suggestions);
    };

    const onSuggestionsClearRequested = (setSuggestions) => {
        setSuggestions([]);
    };

    const getSuggestionValue = suggestion => suggestion.name;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchArtist.toLowerCase())
    );

    const filteredAlbums = albums.filter(album =>
        album.title.toLowerCase().includes(searchAlbum.toLowerCase())
    );

    const filteredSongs = songs.filter(song =>
        song.title.toLowerCase().includes(searchSong.toLowerCase())
    );

    useEffect(() => {
        const fetchData =async () => {
            try {
                const [artistRespone, albumsResponse, songsResponse] = await Promise.all([
                    api.get('/api/artists'),
                    api.get('/api/albums'),
                    api.get('/api/songs')
                ]);
                setArtists(artistRespone.data);
                setAlbums(albumsResponse.data);
                setSongs(songsResponse.data);
            }catch (e){
                console.error('Error fetching data:', e);
            }
        };
        fetchData();
    }, []);

  return (
      <div className="p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Music Library</h1>
          <div className="overflow-x-auto shadow-md rounded-lg">
              <table className="min-w-full bg-white">
                  <thead className="bg-gray-200">
                  <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Artist
                          <Autosuggest
                              suggestions={artistSuggestions}
                              onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested({ value, setSuggestions: setArtistSuggestions, items: artists })}
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
                              onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested({ value, setSuggestions: setAlbumSuggestions, items: albums })}
                              onSuggestionsClearRequested={() => onSuggestionsClearRequested(setAlbumSuggestions)}
                              getSuggestionValue={suggestion => suggestion.title}
                              renderSuggestion={suggestion => <div>{suggestion.title}</div>}
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
                              onSuggestionsFetchRequested={({ value }) => onSuggestionsFetchRequested({ value, setSuggestions: setSongSuggestions, items: songs })}
                              onSuggestionsClearRequested={() => onSuggestionsClearRequested(setSongSuggestions)}
                              getSuggestionValue={suggestion => suggestion.title}
                              renderSuggestion={suggestion => <div>{suggestion.title}</div>}
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
