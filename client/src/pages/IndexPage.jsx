import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../components/Image';

const IndexPage = () => {
    const [places, setPlaces] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
            setSearchResults(response.data); // Initially show all places
        });
    }, []);

    const handleSearch = async () => {
        if (query) {
            try {
                const response = await axios.get(`/search?query=${query}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        } else {
            setSearchResults(places); // Show all places if query is empty
        }
    };

    useEffect(() => {
        handleSearch();
    }, [query]);

    return (
        <div className="mt-8">
            <div className="flex justify-center mb-8">
                <input 
                    type="text" 
                    placeholder="Search places..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-full shadow-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {searchResults.length > 0 && searchResults.map(place => (
                    <Link key={place._id} to={'/place/' + place._id} className="group">
                        <div className="bg-gray-200 mb-2 rounded-2xl overflow-hidden shadow-lg transition-transform transform group-hover:scale-105">
                            {place.photos?.[0] && (
                                <Image className="w-full h-48 object-cover" src={place.photos?.[0]} alt="" />
                            )}
                        </div>
                        <div className="px-4 py-2">
                            <h2 className="font-bold text-lg text-gray-900">{place.address}</h2>
                            <h3 className="text-sm text-gray-600">{place.title}</h3>
                            <div className="mt-1">
                                <span className="font-bold text-primary">${place.price}</span> <span className="text-sm text-gray-600">per night</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default IndexPage;
