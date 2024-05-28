// src/BeerList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import BeerCard from './BeerCard';
import './BeerList.css';

const BeerList = () => {
    const [beers, setBeers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [beersPerPage] = useState(10); // Number of beers per page

    useEffect(() => {
        axios.get('https://api.sampleapis.com/beers/ale')
            .then(response => setBeers(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const filteredBeers = beers.filter(beer =>
        beer.name.toLowerCase().includes(search.toLowerCase())
    );

    const pageCount = Math.ceil(filteredBeers.length / beersPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * beersPerPage;
    const currentBeers = filteredBeers.slice(offset, offset + beersPerPage);

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
                {currentBeers.map(beer => (
                    <BeerCard key={beer.id} beer={beer} />
                ))}
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={changePage}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
};

export default BeerList;
