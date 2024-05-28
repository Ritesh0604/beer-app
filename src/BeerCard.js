import React from 'react';
import './BeerCard.css';

// BeerCard component to display individual beer data
const BeerCard = ({ beer }) => {
    return (
        <div className="beer-card">
            <img src={beer.image} alt={beer.name} className="beer-image" />
            <h2>{beer.name}</h2>
            <p>{beer.price}</p>
        </div>
    );
};

export default BeerCard;
