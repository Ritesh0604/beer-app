import React from 'react';
import './BeerCard.css';

// BeerCard component to display individual beer data
const BeerCard = ({ beer }) => {
    return (
        <div className="beer-card">
            <img src={beer.image} alt={beer.name} className="beer-image" />
            <h2>{beer.name}</h2>
            <p className="beer-price">{beer.price}</p>
            <p className="beer-rating">Average Rating: {beer.rating.average.toFixed(1)}</p>

        </div>
    );
};

export default BeerCard;
