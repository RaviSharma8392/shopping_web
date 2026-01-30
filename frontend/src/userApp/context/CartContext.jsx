import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../features/auth/context/UserContext";
import { getCart, setCart, clearCartDB } from "../features/cart/cartDB/cartDB";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [cart, setCartState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  // LOAD CART
  useEffect(() => {
    if (!uid) {
      setCartState([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const stored = await getCart(uid);
        setCartState(stored);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [uid]);

  // ADD
  const add = async (item) => {
    if (!uid) return;
    setSyncing(true);

    try {
      const existing = cart.find((i) => i.id === item.id);

      let updated;
      if (existing) {
        updated = cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i,
        );
      } else {
        updated = [...cart, { ...item, quantity: item.quantity || 1 }];
      }

      setCartState(updated);
      await setCart(uid, updated);
    } catch (err) {
      setError(err);
    } finally {
      setSyncing(false);
    }
  };

  // UPDATE QTY
  const update = async (id, quantity) => {
    if (!uid) return;
    if (quantity <= 0) return remove(id);

    setSyncing(true);
    try {
      const updated = cart.map((i) => (i.id === id ? { ...i, quantity } : i));
      setCartState(updated);
      await setCart(uid, updated);
    } catch (err) {
      setError(err);
    } finally {
      setSyncing(false);
    }
  };

  // REMOVE
  const remove = async (id) => {
    if (!uid) return;
    setSyncing(true);
    try {
      const updated = cart.filter((i) => i.id !== id);
      setCartState(updated);
      await setCart(uid, updated);
    } catch (err) {
      setError(err);
    } finally {
      setSyncing(false);
    }
  };

  // CLEAR
  const clear = async () => {
    if (!uid) return;
    setSyncing(true);
    try {
      setCartState([]);
      await clearCartDB(uid);
    } catch (err) {
      setError(err);
    } finally {
      setSyncing(false);
    }
  };

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
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
