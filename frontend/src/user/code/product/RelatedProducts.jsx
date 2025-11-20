import React, { useEffect, useState } from "react";
import { useProducts } from "../../hook/useProducts";
import ProductCard from "../cards/ProductCard";

const RelatedProducts = ({ currentProductId, categoryId, collectionType }) => {
  const { getProductsByCategory, getProductsByCollection } = useProducts();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRelatedProducts();
  }, [currentProductId, categoryId, collectionType]);

  const loadRelatedProducts = async () => {
    try {
      let products = [];

      if (categoryId) {
        products = await getProductsByCategory(categoryId);
      } else if (collectionType) {
        products = await getProductsByCollection(collectionType);
      }

      // Filter out current product and limit to 4
      setRelatedProducts(
        products
          .filter((product) => product.id !== currentProductId)
          .slice(0, 4)
      );
    } catch (error) {
      console.error("Error loading related products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 h-80 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
