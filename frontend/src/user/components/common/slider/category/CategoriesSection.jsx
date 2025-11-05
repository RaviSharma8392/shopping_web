import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategoriesSection = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    const categorySlug = category.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    navigate(`/category/${categorySlug}?id=${category._id}`);
  };

  return (
    <div className="my-8">
      {/* Section Title */}
      <h2 className="text-2xl hidden md:flex font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
        Shop By Category
      </h2>

      {/* Categories Wrapper */}
      <div>
        {/* --- Mobile: Horizontal Scroll --- */}
        <div className="flex gap-3  flex-col-10 overflow-x-auto sm:hidden px-1 ">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category)}
              className="flex-shrink-0 w-24 cursor-pointer">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>

        {/* --- Tablet & Desktop: Grid --- */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer">
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
