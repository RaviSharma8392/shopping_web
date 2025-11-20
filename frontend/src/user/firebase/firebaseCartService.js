import { db } from "../../config/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

// FETCH CART
export const fetchCart = async (uid) => {
  const ref = collection(db, "carts", uid, "cartItems");
  const snap = await getDocs(ref);

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ADD TO CART (productId + size uniqueness)
export const addToCart = async (uid, item) => {
  const cartRef = collection(db, "carts", uid, "cartItems");

  // unique key for cart item
  const variantKey = `${item.productId}_${item.size || ""}`;

  // check if same item exists
  const q = query(
    cartRef,
    where("variantKey", "==", variantKey)
  );

  const snap = await getDocs(q);

  if (!snap.empty) {
    // item exists → update quantity
    const existing = snap.docs[0];
    const existingData = existing.data();

    const newQty =
      (existingData.quantity || 1) + (item.quantity || 1);

    await updateDoc(existing.ref, { quantity: newQty });

  } else {
    // create new cart item
    const newRef = doc(cartRef);
    await setDoc(newRef, {
      ...item,
      id: newRef.id,
      variantKey,
      quantity: item.quantity || 1,
      addedAt: Date.now(),
    });
  }

  return fetchCart(uid);
};

// UPDATE QTY
export const updateQty = async (uid, cartItemId, qty) => {
  const ref = doc(db, "carts", uid, "cartItems", cartItemId);
  await updateDoc(ref, { quantity: qty });
  return fetchCart(uid);
};

// REMOVE ITEM
export const removeFromCart = async (uid, cartItemId) => {
  const ref = doc(db, "carts", uid, "cartItems", cartItemId);
  await deleteDoc(ref);
  return fetchCart(uid);
};

// CLEAR CART
export const clearCart = async (uid) => {
  const ref = collection(db, "carts", uid, "cartItems");
  const snap = await getDocs(ref);
  const batch = snap.docs.map((d) =>
    deleteDoc(d.ref)
  );
  await Promise.all(batch);
  return [];
};
