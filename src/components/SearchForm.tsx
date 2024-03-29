import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const SearchForm: React.FC<Props> = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="mr-3"
      />
      <button type="submit" className="mr-3">Search</button>
      <button type="button" onClick={handleClear}>Clear</button>
    </form>
  );
};

export default SearchForm;
