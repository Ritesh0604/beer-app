// src/App.js

import React from 'react';
import BeerList from './BeerList';
import './App.css';

// Main App component
function App() {
    return (
        <div className="App">
            <h1>Beer List</h1>
            <BeerList />
        </div>
    );
}

export default App;
