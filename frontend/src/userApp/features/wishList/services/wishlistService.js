import { openDB } from "idb";

const DB_NAME = "app_offline_db";
const DB_VERSION = 1;
const STORE_NAME = "wishlist";

const getDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "productId",
        });
      }
    },
  });
};

export const wishlistService = {
  async getWishlist() {
    const db = await getDB();
    return await db.getAll(STORE_NAME);
  },

  async addToWishlist(productId) {
    const db = await getDB();

    const item = {
      productId,
      createdAt: Date.now(),
    };

    await db.put(STORE_NAME, item);
    return item;
  },

  async removeFromWishlistByProductId(productId) {
    const db = await getDB();
    await db.delete(STORE_NAME, productId);
  },

  async isInWishlist(productId) {
    const db = await getDB();
    const item = await db.get(STORE_NAME, productId);
    return !!item;
  },

  async clearWishlist() {
    const db = await getDB();
    await db.clear(STORE_NAME);
  },
};
