// SearchBar.js
import React, { useState } from 'react';

import './Search.css'

function SearchBar({ handleSearch }) {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value);
    };

    return (
        <div className="search-bar">
        <input
            className='search-input'
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
        />
        </div>
    );
}

export default SearchBar;
