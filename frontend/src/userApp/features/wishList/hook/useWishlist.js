import { useState, useEffect, useCallback } from "react";
import { wishlistService } from "../services/wishlistService";
import { auth } from "../../../../config/firebase";

export const useWishlist = (productId = null) => {
  const [wishlist, setWishlist] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const [loadingList, setLoadingList] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [ready, setReady] = useState(false);

  // Auth listener (ONLY to know app is ready – NOT for saving)
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(() => {
      setReady(true);
    });
    return () => unsub();
  }, []);

  // Load wishlist from IndexedDB
  const loadWishlist = useCallback(async () => {
    if (!ready) return;

    setLoadingList(true);
    try {
      const items = await wishlistService.getWishlist();
      setWishlist(items);

      if (productId) {
        setIsLiked(items.some((item) => item.productId === productId));
      }
    } finally {
      setLoadingList(false);
    }
  }, [ready, productId]);

  // Add to wishlist (IndexedDB only)
  const addToWishlist = useCallback(
    async (id) => {
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

  // Remove from wishlist
  const removeFromWishlist = useCallback(
    async (id) => {
      setLoadingAction(true);
      try {
        await wishlistService.removeFromWishlistByProductId(id);
        setWishlist((prev) =>
          prev.filter((item) => item.productId !== id)
        );

        if (productId === id) setIsLiked(false);
      } finally {
        setLoadingAction(false);
      }
    },
    [productId]
  );

  // Toggle wishlist
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
