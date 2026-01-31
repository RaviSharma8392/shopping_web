import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { wishlistService } from "../features/wishList/services/wishlistService";
import { auth } from "../../config/firebase";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [ready, setReady] = useState(false);

  /* -------------------------
     APP READY (AUTH INIT)
  -------------------------- */
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(() => {
      setReady(true);
    });
    return () => unsub();
  }, []);

  /* -------------------------
     LOAD WISHLIST (IndexedDB)
  -------------------------- */
  const loadWishlist = useCallback(async () => {
    if (!ready) return;

    setLoading(true);
    try {
      const items = await wishlistService.getWishlist();
      setWishlist(items);
    } finally {
      setLoading(false);
    }
  }, [ready]);

  useEffect(() => {
    if (ready) loadWishlist();
  }, [ready, loadWishlist]);

  /* -------------------------
     ADD
  -------------------------- */
  const add = async (productId) => {
    setSyncing(true);
    try {
      const item = await wishlistService.addToWishlist(productId);
      setWishlist((prev) => [...prev, item]);
    } finally {
      setSyncing(false);
    }
  };

  /* -------------------------
     REMOVE
  -------------------------- */
  const remove = async (productId) => {
    setSyncing(true);
    try {
      await wishlistService.removeFromWishlistByProductId(productId);
      setWishlist((prev) => prev.filter((i) => i.productId !== productId));
    } finally {
      setSyncing(false);
    }
  };

  /* -------------------------
     TOGGLE
  -------------------------- */
  const toggle = async (productId) => {
    if (!productId) return;

    const exists = wishlist.some((i) => i.productId === productId);
    return exists ? remove(productId) : add(productId);
  };

  /* -------------------------
     CHECK
  -------------------------- */
  const isWishlisted = (productId) => {
    console.log("from ", productId);
    return wishlist.some((i) => i.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        syncing,
        count: wishlist.length,
        add,
        remove,
        toggle,
        reload: loadWishlist,
        isWishlisted,
      }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => useContext(WishlistContext);
