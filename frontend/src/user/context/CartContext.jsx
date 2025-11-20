import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchCart,
  addToCart as addToCartService,
  updateQty as updateQtyService,
  removeFromCart as removeFromCartService,
  clearCart as clearCartService,
} from "../firebase/firebaseCartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false); // if an API op is in-flight
  const [error, setError] = useState(null);

  // Load cart when user logs in
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        if (!uid) {
          setCart([]);
          setLoading(false);
          return;
        }
        const items = await fetchCart(uid);
        if (!mounted) return;
        setCart(items);
      } catch (err) {
        console.error("fetchCart error:", err);
        setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [uid]);

  // Helper: merge server response into local state (keeps stable referential equality when unchanged)
  const setCartFromServer = (items) => {
    setCart(items || []);
  };

  // ADD (optimistic)
  const add = async (product) => {
    if (!uid) return { error: "Login required" };

    setError(null);
    setSyncing(true);

    const variantKey = `${product.productId}::${product.size ?? ""}`;

    const idx = cart.findIndex((it) => it.variantKey === variantKey);

    let optimistic;

    if (idx !== -1) {
      // merge quantity
      optimistic = cart.map((it, i) =>
        i === idx ? { ...it, qty: it.qty + (product.qty ?? 1) } : it
      );
    } else {
      // new item
      const newItem = {
        cartItemId:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        variantKey,
        productId: product.productId,
        size: product.size ?? null,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock ?? 1,
        qty: product.qty ?? 1,
      };

      optimistic = [...cart, newItem];
    }

    setCart(optimistic);

    try {
      const server = await addToCartService(uid, product);
      setCartFromServer(server);
      setSyncing(false);
      return server;
    } catch (err) {
      console.error("addToCart failed:", err);
      setError(err);

      try {
        const fresh = await fetchCart(uid);
        setCartFromServer(fresh);
      } catch {}

      setSyncing(false);
      throw err;
    }
  };

  // UPDATE qty (optimistic)
  const update = async (cartItemId, qty) => {
    if (!uid) return { error: "Login required" };

    setError(null);
    setSyncing(true);

    const optimistic = cart
      .map((it) => (it.cartItemId === cartItemId ? { ...it, qty } : it))
      .filter((it) => it.qty > 0);

    setCart(optimistic);

    try {
      const server = await updateQtyService(uid, cartItemId, qty);
      setCartFromServer(server);
      setSyncing(false);
      return server;
    } catch (err) {
      console.error("updateQty failed:", err);
      setError(err);
      // rollback by re-fetch
      try {
        const fresh = await fetchCart(uid);
        setCartFromServer(fresh);
      } catch (e) {}
      setSyncing(false);
      throw err;
    }
  };

  // REMOVE item (optimistic)
  const remove = async (cartItemId) => {
    if (!uid) return { error: "Login required" };

    setError(null);
    setSyncing(true);

    const optimistic = cart.filter((it) => it.cartItemId !== cartItemId);
    setCart(optimistic);

    try {
      const server = await removeFromCartService(uid, cartItemId);
      setCartFromServer(server);
      setSyncing(false);
      return server;
    } catch (err) {
      console.error("removeFromCart failed:", err);
      setError(err);
      try {
        const fresh = await fetchCart(uid);
        setCartFromServer(fresh);
      } catch (e) {}
      setSyncing(false);
      throw err;
    }
  };

  // CLEAR cart
  const clear = async () => {
    if (!uid) return { error: "Login required" };

    setError(null);
    setSyncing(true);
    const optimistic = [];
    setCart(optimistic);

    try {
      const server = await clearCartService(uid);
      setCartFromServer(server);
      setSyncing(false);
      return server;
    } catch (err) {
      console.error("clearCart failed:", err);
      setError(err);
      try {
        const fresh = await fetchCart(uid);
        setCartFromServer(fresh);
      } catch (e) {}
      setSyncing(false);
      throw err;
    }
  };

  // Derived count (number of line items) and totalQty
  const count = cart.length;
  const totalQty = cart.reduce((s, it) => s + (it.qty || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        syncing,
        error,
        add,
        update,
        remove,
        clear,
        count,
        totalQty,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
