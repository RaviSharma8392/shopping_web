import React from "react";

const CategoryCard = ({ category }) => {
  return (
    <div className="group flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 h-full">
      {/* Category Image */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 bg-gray-100">
        <img
          src={
            category.image ||
            "https://via.placeholder.com/100x100?text=Category"
          }
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Category Name */}
      <h3 className="text-center font-medium text-gray-900 text-sm md:text-base line-clamp-2">
        {category.name}
      </h3>

      {/* Product Count (if available) */}
      {category.productCount && (
        <p className="text-xs text-gray-500 mt-1">
          {category.productCount} products
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
