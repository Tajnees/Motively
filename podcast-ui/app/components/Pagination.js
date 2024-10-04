// app/components/Pagination.js

import React from 'react';

const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className={`p-2 border rounded-l ${page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        &#8592; {/* Left Arrow */}
      </button>
      
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`p-2 border rounded-r ${page === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        &#8594; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default Pagination;
