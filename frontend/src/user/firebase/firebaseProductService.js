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
  where 
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const productService = {
  // Create new product
  createProduct: async (productData) => {
    try {
      const productWithMetadata = {
        ...productData,
        price: Number(productData.price) || 0,
        originalPrice: Number(productData.originalPrice) || 0,
        stock: Number(productData.stock) || 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, "products"), productWithMetadata);
      return { id: docRef.id, ...productWithMetadata };
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  // Get all products
  getProducts: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  // Get single product by ID
  getProduct: async (id) => {
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },

  // Get product by slug
  getProductBySlug: async (slug) => {
    try {
      const q = query(collection(db, "products"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error("Product not found");
      }
      
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },

  // Update product
  updateProduct: async (id, productData) => {
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        ...productData,
        price: Number(productData.price) || 0,
        originalPrice: Number(productData.originalPrice) || 0,
        stock: Number(productData.stock) || 0,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },

  // Delete product
  deleteProduct: async (id) => {
    try {
      const docRef = doc(db, "products", id);
      await deleteDoc(docRef);
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const q = query(collection(db, "products"), where("categoryId", "==", categoryId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch products by category: ${error.message}`);
    }
  },

  // Get products by collection type
  getProductsByCollection: async (collectionType) => {
    try {
      const q = query(collection(db, "products"), where("collectionType", "==", collectionType));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error(`Failed to fetch products by collection: ${error.message}`);
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit = 8) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Filter featured products (you can add a 'featured' field to products)
      return products
        .filter(product => product.isActive)
        .slice(0, limit);
    } catch (error) {
      throw new Error(`Failed to fetch featured products: ${error.message}`);
    }
  },

  // Get new arrivals
  getNewArrivals: async (limit = 8) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return products
        .filter(product => product.collectionType === "new-arrivals" && product.isActive)
        .sort((a, b) => new Date(b.createdAt?.toDate?.() || 0) - new Date(a.createdAt?.toDate?.() || 0))
        .slice(0, limit);
    } catch (error) {
      throw new Error(`Failed to fetch new arrivals: ${error.message}`);
    }
  },

  // Search products
  searchProducts: async (searchTerm) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.collectionType?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  },

  // Update product stock
  updateProductStock: async (id, newStock) => {
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        stock: Number(newStock) || 0,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw new Error(`Failed to update product stock: ${error.message}`);
    }
  },

  // Get low stock products
  getLowStockProducts: async (threshold = 10) => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(product => (product.stock || 0) <= threshold && product.stock > 0);
    } catch (error) {
      throw new Error(`Failed to fetch low stock products: ${error.message}`);
    }
  },

  // Get out of stock products
  getOutOfStockProducts: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      return querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(product => (product.stock || 0) <= 0);
    } catch (error) {
      throw new Error(`Failed to fetch out of stock products: ${error.message}`);
    }
  }
};