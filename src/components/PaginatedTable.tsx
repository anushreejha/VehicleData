import React, { useState } from 'react';

interface Props {
  data: any[];
  itemsPerPage: number;
  onSearch: (query: string) => void;
  onClear: () => void;
}

const PaginatedTable: React.FC<Props> = ({ data, itemsPerPage, onSearch, onClear }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const updatedItemsPerPage = itemsPerPage * 2;

  const startIndex = (currentPage - 1) * updatedItemsPerPage;
  const endIndex = startIndex + updatedItemsPerPage;
  const displayData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / updatedItemsPerPage);

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
          <tr className="bg-gray-200">
            {displayData.length > 0 &&
              Object.keys(displayData[0]).map((key, index) => (
                <>
                  <th key={`${key}-${index}`} className="px-4 py-2">{key}</th>
                  {index < Object.keys(displayData[0]).length - 1 && <th className="px-4" style={{ width: '70px' }}></th>}
                </>
              ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((vehicle, index) => (
            <tr key={index} className={index === 0 ? "bg-gray-200" : "border-b"}>
              {Object.values(vehicle).map((value, index) => (
                <>
                  <td key={`${value}-${index}`} className="px-4 py-2 border">{String(value)}</td>
                  {index < Object.values(vehicle).length - 1 && <td className="px-4" style={{ width: '70px' }}></td>}
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4"></div>
      <div className="mt-8"></div>
      <div className="mt-8 flex justify-between">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Previous</button>
        <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default PaginatedTable;
