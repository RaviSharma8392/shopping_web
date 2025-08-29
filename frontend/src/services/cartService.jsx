import axios from "axios";
import { api } from "../config/config";

// Fetch cart items for a user
const getCart = async (userId) => {
  const res = await axios.get(`${api}/cart/${userId}`);
  return res.data; // data will include items array and totalBill
};

// Add a product to cart
const addToCart = async (userId, productId, quantity = 1, unit) => {
  const res = await axios.post(`${api}/cart/add`, {
    userId,
    productId,
    quantity,
    unit,
  });
  return res.data;
};

// Update cart item quantity
const updateCart = async (userId, productId, quantity, unit) => {
  const res = await axios.put(`${api}/cart/update`, {
    userId,
    productId,
    quantity,
    unit,
  });
  return res.data;
};

// Remove an item from cart
const removeFromCart = async (userId, productId, unit) => {
  const res = await axios.delete(`${api}/cart/remove`, {
    data: { userId, productId, unit },
  });
  return res.data;
};

// Clear the entire cart
const clearCart = async (userId) => {
  const res = await axios.delete(`${api}/cart/clear/${userId}`, {});
  return res.data;
};

// Place order
const placeOrder = async (
  userId,
  cartItems,
  totalBill,
  paymentType,
  deliveryAddress,
  message = ""
) => {
  const res = await axios.post(`${api}/order/place`, {
    userId,
    items: cartItems,
    totalBill,
    paymentType, // 'cash' or 'online'
    deliveryAddress, // string
    message, // optional user note
  });
  return res.data;
};

export const CartService = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
  placeOrder,
};
