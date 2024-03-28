import React, { useEffect, useState } from 'react';
import PaginatedTable from '../components/PaginatedTable';

const IndexPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('/vehicle_data.json')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
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
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-64 rounded-md px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-8">
        <PaginatedTable data={filteredVehicles} itemsPerPage={10} />
      </div>
    </div>
  );
};

export default IndexPage;
