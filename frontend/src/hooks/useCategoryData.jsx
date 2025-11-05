import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config";

export const useCategoryData = (categoryId) => {
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch category info
        const categoryRes = await axios.get(`${api}/category/${categoryId}`);
        setCategory(categoryRes.data.category);

        // Fetch products in category
        const productsRes = await axios.get(
          `${api}/item/category/${categoryId}`
        );
        setProducts(productsRes.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  return { category, products, loading };
};
