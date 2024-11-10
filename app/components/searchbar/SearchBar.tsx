'use client'
import React, { useState } from 'react';

const SearchBar = () => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full my-6">
        <input
          type="text"
          placeholder="Search audio..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-700 rounded"
        />
    </div>
  );
};

export default SearchBar;
