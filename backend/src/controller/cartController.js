const Cart=require("../schema/cart");
const Item=require("../schema/items");

const express = require("express");

// Helper to calculate totalBill
const calculateTotalBill = (items) => {
  return items.reduce((acc, item) => acc + item.totalPrice, 0);
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { items: [], totalBill: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add item to cart
const addItem = async (req, res) => {
  const { userId, productId, unit, quantity } = req.body; // Remove price from frontend, calculate from DB

  try {
    const product = await Item.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Get price for selected unit
    const priceObj = product.price.find((p) => p.unit === unit);
    if (!priceObj) return res.status(400).json({ message: "Selected unit not available" });

    let cart = await Cart.findOne({ userId });

    const itemData = {
      productId,
      unit,
      quantity,
      price: priceObj.price,
      totalPrice: priceObj.price * quantity,
    };

    if (!cart) {
      cart = new Cart({
        userId,
        items: [itemData],
        totalBill: itemData.totalPrice,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.unit === unit
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].totalPrice =
          cart.items[itemIndex].price * cart.items[itemIndex].quantity;
      } else {
        cart.items.push(itemData);
      }

      // Recalculate totalBill
      cart.totalBill = cart.items.reduce((acc, i) => acc + i.totalPrice, 0);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Update item quantity
const updateCartItem = async (req, res) => {
  const { userId, productId, unit, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId && item.unit === unit
    );
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    item.totalPrice = item.price * quantity; // ✅ use item.price
    cart.totalBill = calculateTotalBill(cart.items);

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


// Remove item from cart
const removeCartItem = async (req, res) => {
  const { userId, productId, unit } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => !(item.productId.toString() === productId && item.unit === unit)
    );
    cart.totalBill = calculateTotalBill(cart.items);

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: "Cart cleared", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { clearCart, removeCartItem, updateCartItem, addItem, getCart };
