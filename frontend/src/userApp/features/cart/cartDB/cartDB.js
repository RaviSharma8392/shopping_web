import { openDB } from "idb";

const DB_NAME = "main-cart-db";
const STORE_NAME = "cart";

const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

// GET
export const getCart = async (uid) => {
  const db = await getDB();
  return (await db.get(STORE_NAME, uid)) || [];
};

// SET
export const setCart = async (uid, cart) => {
  const db = await getDB();
  await db.put(STORE_NAME, cart, uid);
};

// CLEAR
export const clearCartDB = async (uid) => {
  const db = await getDB();
  await db.delete(STORE_NAME, uid);
};
