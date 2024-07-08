'use client';

import {useEffect, useState} from "react";
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function Home() {
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [songs, setSongs] = useState([]);



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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Artist</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Album</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Song</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {artists.map(artist =>
                      albums.filter(album => album.artistId === artist.id).map(album =>
                          songs.filter(song => song.albumId === album.id).map((song, index) => (
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
