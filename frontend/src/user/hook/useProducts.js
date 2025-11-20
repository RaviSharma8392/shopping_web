import { useState, useEffect, useCallback } from "react";
import { productService } from "../firebase/firebaseProductService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all products
  const getProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.getProducts();
      setProducts(productsData);
      console.log(productsData)
      return productsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);



  // Get single product by ID
  const getProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const product = await productService.getProduct(id);
      return product;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get product by slug
  const getProductBySlug = useCallback(async (slug) => {
    try {
      setLoading(true);
      setError(null);
      const product = await productService.getProductBySlug(slug);
      return product;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products by category
  const getProductsByCategory = useCallback(async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.getProductsByCategory(categoryId);
      return productsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get products by collection
  const getProductsByCollection = useCallback(async (collectionType) => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.getProductsByCollection(collectionType);
      return productsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get featured products
  const getFeaturedProducts = useCallback(async (limit = 8) => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.getFeaturedProducts(limit);
      return productsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get new arrivals
  const getNewArrivals = useCallback(async (limit = 8) => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.getNewArrivals(limit);
      return productsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search products
  const searchProducts = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productService.searchProducts(searchTerm);
      return productsData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create product
  const createProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      setError(null);
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update product
  const updateProduct = useCallback(async (id, productData) => {
    try {
      setLoading(true);
      setError(null);
      await productService.updateProduct(id, productData);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? { ...product, ...productData } : product
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete product
  const deleteProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update product stock
  const updateProductStock = useCallback(async (id, newStock) => {
    try {
      setLoading(true);
      setError(null);
      await productService.updateProductStock(id, newStock);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? { ...product, stock: newStock } : product
        )
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  // Load products on mount if needed
  useEffect(() => {
    // You can choose to load all products on mount or load on demand
    // getProducts();
  }, [getProducts]);

  return {
    // Data
    products,
    
    // States
    loading,
    error,
    
    // Product operations
    getProducts,
    getProduct,
    getProductBySlug,
    getProductsByCategory,
    getProductsByCollection,
    getFeaturedProducts,
    getNewArrivals,
    searchProducts,
    
    // CRUD operations
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    
    // Utility
    clearError
  };
};