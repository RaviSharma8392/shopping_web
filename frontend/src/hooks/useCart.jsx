// hooks/useCart.js
import { useEffect, useState } from "react";
import { CartService } from "../services/cartService";
import { toast } from "react-toastify";

export const useCart = (userId, navigate) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (!userId) return navigate("/login");
    (async () => {
      try {
        const data = await CartService.getCart(userId);
        setCart(data.items || []);
        setSubtotal(data.totalBill || 0);
      } catch {
        toast.error("Failed to load cart items");
      }
    })();
  }, [userId, navigate]);

  return { cart, subtotal, setCart, setSubtotal };
};
