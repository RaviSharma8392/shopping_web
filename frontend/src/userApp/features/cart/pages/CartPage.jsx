import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../auth/context/UserContext";
import EmptyCart from "../components/EmptyCart";
import CartControlHeader from "../components/header/CartControlHeader";
import CartItemCard from "../components/cards/CartItemCard";
import CartSummary from "../../cart/components/CartSummary";
import CheckOutBottomBar from "../components/bars/CheckOutBottomBar";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, loading, update, remove, clear, syncing } = useCart();
  const { isLoggedIn } = useAuth();

  /* ✅ ALL HOOKS AT TOP */
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedItems = useMemo(
    () => cart.filter((item) => selectedIds.includes(item.id)),
    [cart, selectedIds],
  );

  const totalPrice = useMemo(
    () =>
      selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems],
  );

  const originalTotalPrice = useMemo(
    () =>
      selectedItems.reduce(
        (sum, item) => sum + (item.originalPrice ?? item.price) * item.quantity,
        0,
      ),
    [selectedItems],
  );

  /* ✅ EARLY RETURNS AFTER HOOKS */
  if (!isLoggedIn) {
    return (
      <h2 className="text-center mt-20">Please login to view your cart.</h2>
    );
  }

  if (loading) {
    return <p className="text-center mt-20">Loading cart...</p>;
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  /* ------------------ Selection Logic ------------------ */
  const handleSelectItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === cart.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cart.map((item) => item.id));
    }
  };

  const handlePlaceOrder = () => {
    if (syncing) return;

    if (selectedIds.length === 0) {
      alert("Please select at least one item");
      return;
    }

    navigate("/checkout/address", {
      state: { selectedIds },
    });
  };

  return (
    <div className="max-w-5xl mx-auto py-1 md:mt-4 md:py-4 flex flex-col md:flex-row gap-6">
      {/* LEFT */}
      <div className="flex-1">
        <CartControlHeader
          cartItems={cart}
          selectedItems={selectedIds}
          onToggleSelect={handleSelectAll}
          onClearCart={() => {
            clear();
            setSelectedIds([]);
          }}
          totalPrice={totalPrice}
        />

        {cart.map((item) => (
          <CartItemCard
            key={item.id}
            product={item}
            selected={selectedIds.includes(item.id)}
            onSelect={() => handleSelectItem(item.id)}
            onRemove={() => {
              remove(item.id);
              setSelectedIds((prev) => prev.filter((x) => x !== item.id));
            }}
            onQtyChange={(qty) => update(item.id, qty)}
            disabled={syncing}
          />
        ))}
      </div>

      {/* RIGHT */}
      <div className="hidden md:block md:w-1/3">
        <CartSummary
          subtotal={totalPrice}
          originalTotalPrice={originalTotalPrice}
          platformFee={50}
          selectedItems={selectedItems}
        />
      </div>

      {/* BOTTOM BAR */}
      <CheckOutBottomBar
        selectedItems={selectedItems}
        totalPrice={totalPrice}
        onPlaceOrder={handlePlaceOrder}
        disabled={syncing}
      />
    </div>
  );
};

export default CartPage;
