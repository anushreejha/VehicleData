import React, { useEffect, useState } from 'react';
import PaginatedTable from '../components/PaginatedTable';
import SearchForm from '../components/SearchForm';
import '../styles/index.css';

const IndexPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('/vehicle_data.json')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    return Object.values(vehicle).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Vehicle Data</h1>
        {/* Use a spacer to push the search bar to the right */}
        <div></div>
        <SearchForm onSearch={handleSearch} onClear={handleClearSearch} />
      </div>
      {/* Insert a blank row */}
      <div style={{ height: '60px' }}></div>
      <div className="mt-8">
        <PaginatedTable data={filteredVehicles} itemsPerPage={10} onSearch={handleSearch} onClear={handleClearSearch} />
      </div>
    </div>
  );
};

export default IndexPage;
