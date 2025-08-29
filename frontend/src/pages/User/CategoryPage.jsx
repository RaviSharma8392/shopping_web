import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

import { useCategoryData } from "../../hooks/useCategoryData";
import { useFilteredProducts } from "../../hooks/useFilteredProducts";

import ItemCard from "../../components/item/ItemCard";
import SubcategoryFilterBar from "../../components/ui/navbar/SubcategoryFilterBar";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("id");

  const { category, products, loading } = useCategoryData(categoryId);

  const [selectedSubcategory, setSelectedSubcategory] = useState("all");

  // Filter only by subcategory
  const filteredProducts = useFilteredProducts(products, selectedSubcategory);

  const handleProductClick = (product) => {
    const productSlug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const categorySlug = category.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const subcategorySlug = product.subcategory
      ? product.subcategory.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "all"; // Default to "all" if no subcategory is available

    navigate(
      `/item/${product._id}/${productSlug}/${categorySlug}/${subcategorySlug}`
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader size={80} color="#4f46e5" />
      </div>
    );

  if (!category) return <p className="text-center py-20">Category Not Found</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 capitalize">
          {category.name}
        </h1>

        {/* Horizontal Subcategory Filter */}
        <SubcategoryFilterBar
          category={category}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
        />

        {/* Product Grid */}
        {filteredProducts.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredProducts.map((product) => (
              <ItemCard
                key={product._id}
                item={product}
                onDetailClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center shadow-sm mt-4">
            <p className="text-lg text-gray-600">
              No products found in this subcategory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
