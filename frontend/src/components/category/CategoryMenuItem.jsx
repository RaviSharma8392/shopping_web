import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const CategoryMenuItem = ({
  category,
  activeCategory,
  onCategoryClick,
  onHover,
  isHovered,
}) => {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategory) => {
    const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");
    const subcategorySlug = subcategory.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/c/${categorySlug}/${subcategorySlug}?id=${subcategory._id}`);
    onHover(null); // close dropdown
  };

  const handleCategoryClick = () => onCategoryClick(category);

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={() => onHover(category._id)}
      onMouseLeave={() => onHover(null)}>
      <button
        onClick={handleCategoryClick}
        className={`flex items-center px-4 py-2 mx-1 rounded-md font-medium transition-colors duration-200
          ${
            activeCategory === category.name
              ? "bg-amber-600 text-white"
              : "text-gray-200 hover:bg-gray-800"
          }`}>
        {category.name}
        {category.subcategories?.length > 0 && (
          <FaChevronDown
            className={`ml-2 text-xs transition-transform duration-200 ${
              isHovered ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* DROPDOWN: FIXED POSITION */}
      {isHovered && category.subcategories?.length > 0 && (
        <div
          className="fixed top-[60px] left-0 mt-1 bg-white border border-gray-200 text-gray-800 rounded-md shadow-xl py-2 z-50 min-w-[200px]"
          style={{ left: `${category?.dropdownLeft || 0}px` }}>
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-100">
            {category.name}
          </div>
          <div className="max-h-60 overflow-y-auto">
            {category.subcategories.map((sub) => (
              <button
                key={sub._id}
                className="block w-full text-left px-4 py-2 hover:bg-amber-50 hover:text-amber-700 text-sm"
                onClick={() => handleSubcategoryClick(sub)}>
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenuItem;
