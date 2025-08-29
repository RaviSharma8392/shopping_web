import { useState, useEffect } from "react";

export const useFilteredProducts = (products, selectedSubcategory) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    if (selectedSubcategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.subcategory === selectedSubcategory
      );
      setFilteredProducts(filtered);
    }
  }, [products, selectedSubcategory]);

  return filteredProducts;
};
