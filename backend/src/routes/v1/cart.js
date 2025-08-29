// routes/cart.js
const express = require("express");
const { getCart, addItem, updateCartItem, removeCartItem, clearCart } = require("../../controller/cartController");
const cart_router = express.Router();


// Get a user's cart
cart_router.get("/:userId", getCart);

// Add an item to the cart
cart_router.post("/add", addItem);

// Update an item in the cart
cart_router.put("/update", updateCartItem);

// Remove an item from the cart
cart_router.delete("/remove", removeCartItem);

// Clear the entire cart
cart_router.delete("/clear/:userId", clearCart);

module.exports = cart_router;
