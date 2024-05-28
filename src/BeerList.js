// src/BeerList.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import BeerCard from './BeerCard';
import './BeerList.css';

const BeerList = () => {
    const [beers, setBeers] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [beersPerPage] = useState(10); // Number of beers per page
    const [totalBeers, setTotalBeers] = useState(0);

    useEffect(() => {
        fetchBeers(currentPage + 1, beersPerPage, search);
    }, [currentPage, beersPerPage, search]);

    const fetchBeers = async (page, limit, searchTerm) => {
        try {
            const response = await axios.get('https://api.sampleapis.com/beers/ale');
            const filteredBeers = response.data.filter(beer =>
                beer.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setBeers(filteredBeers.slice((page - 1) * limit, page * limit));
            setTotalBeers(filteredBeers.length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const pageCount = Math.ceil(totalBeers / beersPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    };

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
                {beers.map(beer => (
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
