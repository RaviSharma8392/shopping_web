import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItemCard from "../code/cards/CartItemCard";
import CartControlHeader from "../code/header/CartControlHeader";
import CheckOutBottomBar from "../code/bars/CheckOutBottomBar";
import CartSummary from "../code/cartComponents/CartSummary";
import EmptyCart from "../code/empty/EmptyCart";

const CartPage = () => {
  const { cart, loading, update, remove, clear } = useCart();
  const { isLoggedIn } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setCartItems(cart); // sync when server updates
  }, [cart]);

  // Quantity Change
  const handleQtyChange = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
    update(id, newQty);
  };

  // Select / Unselect item
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Select all
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((i) => i.id));
    }
  };

  // Compute totals of selected items only
  const selected = cartItems.filter((item) => selectedItems.includes(item.id));

  const totalPrice = selected.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const originalTotalPrice = selected.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );

  if (!isLoggedIn)
    return (
      <h2 className="text-center mt-20">Please login to view your cart.</h2>
    );

  if (loading) return <p className="text-center mt-20">Loading cart...</p>;

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="max-w-5xl mx-auto py-0.5 md:mt-4 md:py-4 flex flex-col md:flex-row gap-6">
      {/* Left Items */}
      <div className="flex-1">
        <CartControlHeader
          cartItems={cartItems}
          selectedItems={selectedItems}
          onToggleSelect={handleSelectAll}
          onClearCart={() => {
            clear();
            setSelectedItems([]);
            setCartItems([]);
          }}
          totalPrice={totalPrice}
        />

        {cartItems.map((item) => (
          <CartItemCard
            key={item.id}
            product={item}
            selected={selectedItems.includes(item.id)}
            onSelect={() => handleSelectItem(item.id)}
            onRemove={() => {
              remove(item.id);
              setCartItems((prev) => prev.filter((i) => i.id !== item.id));
              setSelectedItems((prev) => prev.filter((x) => x !== item));
            }}
            onQtyChange={(newQty) => handleQtyChange(item.id, newQty)}
          />
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block md:w-1/3">
        <CartSummary
          subtotal={totalPrice}
          originalTotalPrice={originalTotalPrice}
          platformFee={50}
          selectedItems={selected}
        />
      </div>

      {/* Bottom Checkout */}
      <CheckOutBottomBar
        selectedItems={selected}
        totalPrice={totalPrice}
        onPlaceOrder={() => console.log("onPlaceOrder")}
      />
    </div>
  );
};

export default CartPage;
