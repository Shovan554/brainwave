// src/components/SearchBar.jsx
import React from 'react';
import '../styles/searchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input type="text" className="search-input" placeholder="Search..." />
    </div>
  );
};

export default SearchBar;