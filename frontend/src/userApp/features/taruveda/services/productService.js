import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../config/firebase";

const PRODUCTS_COLLECTION = "products";

export const productService = {


  // GET ALL PRODUCTS
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

  // GET PRODUCT BY ID
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

  // GET PRODUCT BY SLUG
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

 
 
  // GET PRODUCTS BY CATEGORY
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

 
 
 
 
};
