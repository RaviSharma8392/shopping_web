import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const PRODUCTS_COLLECTION = "products";

export const productService = {
  // -----------------------------
  // CREATE PRODUCT
  // -----------------------------
  createProduct: async (productData) => {
    try {
      const productWithMetadata = {
        ...productData,
        price: Number(productData.price) || 0,
        originalPrice: Number(productData.originalPrice) || 0,
        stock: Number(productData.stock) || 0,
        collectionTypes: productData.collectionTypes || [], // 👈 IMPORTANT
        isActive: productData.isActive ?? true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, PRODUCTS_COLLECTION),
        productWithMetadata
      );

      return { id: docRef.id, ...productWithMetadata };
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  // -----------------------------
  // GET ALL PRODUCTS
  // -----------------------------
  getProducts: async () => {
    try {
      const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  // -----------------------------
  // GET PRODUCT BY ID
  // -----------------------------
  getProductById: async (id) => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Product not found");
      }

      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },

  // -----------------------------
  // GET PRODUCT BY SLUG
  // -----------------------------
  getProductBySlug: async (slug) => {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where("slug", "==", slug)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        throw new Error("Product not found");
      }

      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },

  // -----------------------------
  // UPDATE PRODUCT
  // -----------------------------
  updateProduct: async (id, productData) => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);

      await updateDoc(docRef, {
        ...productData,
        price: Number(productData.price) || 0,
        originalPrice: Number(productData.originalPrice) || 0,
        stock: Number(productData.stock) || 0,
        collectionTypes: productData.collectionTypes || [],
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },

  // -----------------------------
  // DELETE PRODUCT
  // -----------------------------
  deleteProduct: async (id) => {
    try {
      await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  },

  // -----------------------------
  // GET PRODUCTS BY CATEGORY
  // -----------------------------
  getProductsByCategory: async (categoryId) => {
    try {
      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where("categoryId", "==", categoryId),
        where("isActive", "==", true)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      throw new Error(`Failed to fetch products by category: ${error.message}`);
    }
  },

  // -----------------------------
  // 🔥 GENERIC: GET PRODUCTS BY COLLECTION TYPES
  // -----------------------------
  getProductsByCollections: async (collectionTypes = [], limit = 8) => {
    try {
      if (!collectionTypes.length) return [];

      const q = query(
        collection(db, PRODUCTS_COLLECTION),
        where("isActive", "==", true),
        where("collectionTypes", "array-contains-any", collectionTypes)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .slice(0, limit);
    } catch (error) {
      throw new Error(`Failed to fetch products by collections: ${error.message}`);
    }
  },

  // -----------------------------
  // SEARCH PRODUCTS (CLIENT SIDE)
  // -----------------------------
  searchProducts: async (searchTerm) => {
    try {
      const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));

      return snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  },

  // -----------------------------
  // UPDATE PRODUCT STOCK
  // -----------------------------
  updateProductStock: async (id, newStock) => {
    try {
      await updateDoc(doc(db, PRODUCTS_COLLECTION, id), {
        stock: Number(newStock) || 0,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(`Failed to update product stock: ${error.message}`);
    }
  },

  // -----------------------------
  // LOW STOCK PRODUCTS
  // -----------------------------
  getLowStockProducts: async (threshold = 10) => {
    try {
      const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));

      return snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (product) =>
            product.stock > 0 && product.stock <= threshold
        );
    } catch (error) {
      throw new Error(`Failed to fetch low stock products: ${error.message}`);
    }
  },

  // -----------------------------
  // OUT OF STOCK PRODUCTS
  // -----------------------------
  getOutOfStockProducts: async () => {
    try {
      const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));

      return snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((product) => product.stock <= 0);
    } catch (error) {
      throw new Error(`Failed to fetch out of stock products: ${error.message}`);
    }
  },
};
