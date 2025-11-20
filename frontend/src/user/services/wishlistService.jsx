import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const addToWishlist = async (productId) => {
  const user = auth.currentUser;

  const entry = {
    productId,
    userId: user ? user.uid : "guest",
  };

  let updatedWishlist = [];

  if (user) {
    // For logged-in users → Firebase
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const oldList = snap.exists() ? snap.data().wishlist || [] : [];

    updatedWishlist = [...oldList, entry];

    await updateDoc(ref, { wishlist: updatedWishlist });
  } else {
    // Guest users → LocalStorage
    const localList = JSON.parse(localStorage.getItem("wishlist")) || [];
    updatedWishlist = [...localList, entry];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }
};
