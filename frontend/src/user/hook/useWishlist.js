import { useState, useEffect, useCallback } from "react";
import { wishlistService } from "../firebase/firebaseWishlistService";
import { auth } from "../../config/firebase";

export const useWishlist = (productId = null) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const [ready, setReady] = useState(false);
  const user = auth.currentUser;

  // Auth state listener
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(() => {
      setReady(true);
    });
    return () => unsub();
  }, []);

  // Load wishlist
  const loadWishlist = useCallback(async () => {
    if (!ready) return;
    if (!auth.currentUser) return; // prevent errors

    setLoadingList(true);
    try {
      const items = await wishlistService.getWishlist();
      setWishlist(items);

      if (productId) {
        setIsLiked(items.some((w) => w.productId === productId));
      }
    } finally {
      setLoadingList(false);
    }
  }, [ready, productId]);

  // Add
  const addToWishlist = useCallback(
    async (id) => {
      if (!auth.currentUser) return;

      setLoadingAction(true);
      try {
        const newItem = await wishlistService.addToWishlist(id);

        setWishlist((prev) => [...prev, newItem]);

        if (productId === id) setIsLiked(true);
      } finally {
        setLoadingAction(false);
      }
    },
    [productId]
  );

  // Remove
  const removeFromWishlist = useCallback(
    async (id) => {
      if (!auth.currentUser) return;

      setLoadingAction(true);
      try {
        await wishlistService.removeFromWishlistByProductId(id);

        setWishlist((prev) => prev.filter((item) => item.productId !== id));

        if (productId === id) setIsLiked(false);
      } finally {
        setLoadingAction(false);
      }
    },
    [productId]
  );

  // Toggle
  const toggleWishlist = useCallback(() => {
    if (!productId) return;

    if (isLiked) {
      return removeFromWishlist(productId);
    } else {
      return addToWishlist(productId);
    }
  }, [isLiked, productId, addToWishlist, removeFromWishlist]);

  // Initial load
  useEffect(() => {
    if (ready) loadWishlist();
  }, [ready, loadWishlist]);

  return {
    wishlist,
    isLiked,
    loading: loadingList || loadingAction,
    loadingList,
    loadingAction,
    toggleWishlist,
    addToWishlist,
    removeFromWishlist,
    reload: loadWishlist,
    count: wishlist.length,
  };
};
