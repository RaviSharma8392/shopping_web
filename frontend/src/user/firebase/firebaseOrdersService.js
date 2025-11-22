import { db } from "../../config/firebase";
import { doc, setDoc, serverTimestamp, getDocs, collection, query, where } from "firebase/firestore";

export const createOrder = async (orderId, orderData) => {
  await setDoc(doc(db, "orders", orderId), {
    ...orderData,
    createdAt: serverTimestamp(),
  });

  return orderId;
};

export const fetchUserOrders = async (userId) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
