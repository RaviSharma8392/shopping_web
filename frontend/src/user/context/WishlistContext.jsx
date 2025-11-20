import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

import {
  fetchWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../firebase/firebaseWishlistService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!uid) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const items = await fetchWishlist();
      setWishlist(items);
      setLoading(false);
    };

    load();
  }, [uid]);

  const add = async (productId) => {
    if (!uid) return { error: "Login required" };

    const newItem = await addWishlistItem(productId);
    const fresh = await fetchWishlist();
    setWishlist(fresh);
    return newItem;
  };

  const remove = async (productId) => {
    await removeWishlistItem(productId);
    const fresh = await fetchWishlist();
    setWishlist(fresh);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        add,
        remove,
        count: wishlist.length,
      }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
