import React from 'react';

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Buscar audio..."
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;