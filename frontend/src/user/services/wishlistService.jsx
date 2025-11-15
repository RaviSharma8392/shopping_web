import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

// Normalize wishlist product
const normalizeWishlistProduct = (product) => {
  let images = [];

  if (Array.isArray(product.images) && product.images.length > 0) {
    images = product.images.filter(Boolean);
  } else if (typeof product.image === "string") {
    images = [product.image];
  } else if (Array.isArray(product.image)) {
    images = product.image.filter(Boolean);
  } else if (product.banner) {
    images = [product.banner];
  } else {
    images = ["/placeholder.jpg"];
  }

  return {
    id: product.id || crypto.randomUUID(),
    name: product.name || "Untitled Product",
    price: product.price || 0,
    images,
    ...product,
  };
};

export const addToWishlist = async (product) => {
  const user = auth.currentUser;

  // Only wishlist normalization
  const normalized = normalizeWishlistProduct(product);

  let updatedWishlist = [];

  if (user) {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    const old = snap.exists() ? snap.data().wishlist || [] : [];

    updatedWishlist = [...old, normalized];
    await updateDoc(ref, { wishlist: updatedWishlist });
  } else {
    const local = JSON.parse(localStorage.getItem("wishlist")) || [];
    updatedWishlist = [...local, normalized];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }
};
