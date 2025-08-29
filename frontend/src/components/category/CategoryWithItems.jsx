import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "../item/ItemCard";

const CategoryWithItems = ({ category }) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Detect mobile screens (less than 768px)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle item click to navigate to details page
  const handleDetailClick = (item) => {
    // Create URL-friendly slugs
    const nameSlug = item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const categorySlug = category.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const subcategorySlug = item.subcategory
      ? item.subcategory
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : "all";

    // Navigate to the item details page with the specified route structure
    navigate(
      `/item/${item._id}/${nameSlug}/${categorySlug}/${subcategorySlug}`
    );
  };

  // Limit to 4 items on mobile, 10 on desktop for initial view
  const limitedItems = isMobile
    ? category.items.slice(0, 4)
    : category.items.slice(0, 10);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
        {category.image && (
          <img
            src={category.image}
            alt={category.name}
            className="w-10 h-10 rounded-full mr-2 object-cover border-2 border-white shadow-sm"
          />
        )}
        <span className="capitalize">{category.name}</span>
      </h2>

      {category.items.length === 0 ? (
        <p className="text-gray-500 text-sm">No products in this category.</p>
      ) : (
        <>
          {/* Mobile Grid Layout (2x2) */}
          {isMobile ? (
            <div className="grid grid-cols-2 gap-4">
              {limitedItems.map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onDetailClick={() => handleDetailClick(item)}
                />
              ))}
            </div>
          ) : (
            // Desktop Horizontal Scrolling Layout (10 products)
            <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-3">
              {limitedItems.map((item) => (
                <div key={item._id} className="flex-shrink-0 w-60">
                  <ItemCard
                    item={item}
                    onDetailClick={() => handleDetailClick(item)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* View All Button (visible if more items exist) */}
          {category.items.length > limitedItems.length && (
            <div className="mt-4 text-center">
              <button
                onClick={() =>
                  navigate(
                    `/category/${category.name
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "")}`
                  )
                }
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition">
                View All {category.items.length} Products
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryWithItems;
