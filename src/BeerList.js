// src/BeerList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import BeerCard from './BeerCard';
import './BeerList.css';

// BeerList component to fetch and display the list of beers with pagination and search functionality
const BeerList = () => {
    const [beers, setBeers] = useState([]); // State to hold the list of beers
    const [search, setSearch] = useState(''); // State for the search input value
    const [currentPage, setCurrentPage] = useState(0); // State for the current page number
    const [beersPerPage] = useState(10); // Number of beers to display per page
    const [totalBeers, setTotalBeers] = useState(0); // Total number of beers (for pagination)

    // Effect to fetch beers when the component mounts or when currentPage, beersPerPage, or search changes
    useEffect(() => {
        fetchBeers(currentPage + 1, beersPerPage, search);
    }, [currentPage, beersPerPage, search]);

    // Function to fetch beers from the API
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

    // Calculate the total number of pages
    const pageCount = Math.ceil(totalBeers / beersPerPage);

    // Function to handle page change
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
