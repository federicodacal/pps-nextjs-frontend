'use client'

import React, { useState } from 'react';
import CardGrid from '../../components/cards/CardGrid';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <header className="py-6 bg-violet text-center text-3xl font-bold">AudioLibre</header>
      <div className="p-4">
        <input
          type="text"
          placeholder="Search audio..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 bg-gray-700 rounded"
        />
      </div>
      <div className="p-4">
        <CardGrid />
      </div>
    </div>
  );
};

export default HomePage;