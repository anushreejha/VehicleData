import React, { useState } from 'react';

interface Vehicle {
  [key: string]: string | number;
}

interface Props {
  data: Vehicle[];
  itemsPerPage: number;
}

const PaginatedTable: React.FC<Props> = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-8">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {displayData.length > 0 &&
              Object.keys(displayData[0]).map((key) => (
                <th key={key} className="px-4 py-2 bg-gray-200 text-left">{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((vehicle, index) => (
            <tr key={index}>
              {Object.values(vehicle).map((value, index) => (
                <td key={index} className="px-4 py-2 border">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4"></div>
      <div className="mt-8 flex justify-between">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Previous</button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default PaginatedTable;
