import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="group flex flex-col items-center text-center bg-white rounded-lg p-2 hover:shadow-md transition duration-300">
      {/* Category Image */}
      <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden mb-2 bg-gray-100">
        <img
          src={category.image || "https://via.placeholder.com/80x80?text=Cat"}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Category Name */}
      <h3 className="font-medium text-gray-900 text-xs md:text-sm line-clamp-2">
        {category.name}
      </h3>

      {/* Product Count (if available) */}
      {category.productCount && (
        <p className="text-[10px] md:text-xs text-gray-500 mt-1">
          {category.productCount} products
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
