import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const CategoriesSection = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    // Create URL-friendly slug
    const categorySlug = category.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    // Navigate to category page
    navigate(`/category/${categorySlug}?id=${category._id}`);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-200">
        Shop By Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
  );
};

export default CategoriesSection;
