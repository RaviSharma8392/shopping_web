import { createContext, useContext, useEffect, useState } from "react";
import {
  getWishlistDB,
  addWishlistDB,
  removeWishlistDB,
  clearWishlistDB,
} from "../db/wishlistDB";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getWishlistDB();
        if (mounted) setWishlist(data);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => (mounted = false);
  }, []);

  const add = async (product) => {
    setSyncing(true);
    try {
      const productId = typeof product === "object" ? product.id : product;

      if (!productId) throw new Error("Invalid productId");

      const item = await addWishlistDB(productId.toString()); // <-- convert to string
      setWishlist((prev) => [...prev, item]);
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
    } finally {
      setSyncing(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    setSyncing(true);
    try {
      await removeWishlistDB(productId);
      setWishlist((prev) => prev.filter((i) => i.productId !== productId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
    } finally {
      setSyncing(false);
    }
  };

  // ✅ Rename toggle to toggleWishlist
  const toggleWishlist = async (productId) => {
    const exists = wishlist.some((i) => i.productId === productId);
    console.log(productId);
    return exists ? remove(productId) : add(productId);
  };

  const clear = async () => {
    setSyncing(true);
    try {
      await clearWishlistDB();
      setWishlist([]);
    } catch (err) {
      console.error("Failed to clear wishlist:", err);
    } finally {
      setSyncing(false);
    }
  };

  const isWishlisted = (productId) =>
    wishlist.some((i) => i.productId === productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        syncing,
        count: wishlist.length,
        add,
        removeFromWishlist,
        toggleWishlist,
        clear,
        isWishlisted,
      }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
