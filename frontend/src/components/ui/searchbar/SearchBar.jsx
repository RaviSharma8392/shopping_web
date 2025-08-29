import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm, className = "" }) => {
  return (
    <div
      className={`flex rounded-md shadow-sm overflow-hidden group ${className}`}>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 text-gray-800 bg-white border border-gray-300 focus:outline-none focus:bg-gray-50 focus:border-gray-400 transition-colors duration-200"
      />
      <button
        className="bg-gray-200 text-gray-600 px-4 flex items-center justify-center transition-colors duration-200 
                   hover:bg-gray-300 group-hover:bg-gray-300 group-focus-within:bg-gray-300">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
