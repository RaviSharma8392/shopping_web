import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where 
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { getAuth } from "firebase/auth";

export const wishlistService = {

  // -----------------------------
  // Add to wishlist
  // -----------------------------
  addToWishlist: async (productId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("Please login to add items to wishlist");

      // Check if already in wishlist
      const q = query(
        collection(db, "wishlist"),
        where("userId", "==", user.uid),
        where("productId", "==", productId)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        throw new Error("Product already in wishlist");
      }

      const item = {
        userId: user.uid,
        productId: productId,
        addedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "wishlist"), item);

      return { id: docRef.id, ...item };

    } catch (error) {
      throw new Error(`Failed to add to wishlist: ${error.message}`);
    }
  },

  // -----------------------------
  // Remove wishlist item by its wishlist document ID
  // -----------------------------
  removeFromWishlist: async (wishlistItemId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("Please login to manage wishlist");

      await deleteDoc(doc(db, "wishlist", wishlistItemId));

    } catch (error) {
      throw new Error(`Failed to remove from wishlist: ${error.message}`);
    }
  },

  // -----------------------------
  // Get all wishlist items for logged-in user
  // -----------------------------
  getWishlist: async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return [];

      const q = query(
        collection(db, "wishlist"),
        where("userId", "==", user.uid)
      );

      const snap = await getDocs(q);

      return snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

    } catch (error) {
      throw new Error(`Failed to fetch wishlist: ${error.message}`);
    }
  },

  // -----------------------------
  // Check if a product is in wishlist
  // -----------------------------
  isInWishlist: async (productId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return false;

      const q = query(
        collection(db, "wishlist"),
        where("userId", "==", user.uid),
        where("productId", "==", productId)
      );

      const snap = await getDocs(q);

      return !snap.empty;

    } catch (error) {
      console.error("Error checking wishlist:", error);
      return false;
    }
  },

  // -----------------------------
  // Remove wishlist item using productId instead of document ID
  // -----------------------------
  removeFromWishlistByProductId: async (productId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) throw new Error("Please login to manage wishlist");

      const q = query(
        collection(db, "wishlist"),
        where("userId", "==", user.uid),
        where("productId", "==", productId)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const docId = snap.docs[0].id;
        await deleteDoc(doc(db, "wishlist", docId));
      }

    } catch (error) {
      throw new Error(`Failed to remove from wishlist: ${error.message}`);
    }
  }
};

export const fetchWishlist = wishlistService.getWishlist;
export const addWishlistItem = wishlistService.addToWishlist;
export const removeWishlistItem = wishlistService.removeFromWishlistByProductId;

