import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const useWishlist = (productId) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      const user = auth.currentUser;

      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const list = snap.exists() ? snap.data().wishlist || [] : [];

        setIsLiked(list.some((item) => item.id === productId));
      } else {
        const local = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsLiked(local.some((item) => item.id === productId));
      }
    };

    checkWishlist();
  }, [productId]);

  return { isLiked, setIsLiked };
};
