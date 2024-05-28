// src/BeerList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BeerCard from './BeerCard';
import './BeerList.css';

const BeerList = () => {
    const [beers, setBeers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('https://api.sampleapis.com/beers/ale')
            .then(response => setBeers(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredBeers = beers.filter(beer =>
        beer.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="beer-list">
            <input
                type="text"
                placeholder="Search beers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
            />
            <div className="beer-cards">
                {filteredBeers.map(beer => (
                    <BeerCard key={beer.id} beer={beer} />
                ))}
            </div>
        </div>
    );
};

export default BeerList;
