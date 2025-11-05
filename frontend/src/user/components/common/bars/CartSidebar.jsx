import React from "react";
import { X } from "lucide-react";
import { useCart } from "../../../../context/CartContext";

const CartSidebar = () => {
  const { cart, isSidebarOpen, setIsSidebarOpen, removeFromCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-5 transition-transform duration-300 
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={() => setIsSidebarOpen(false)}>
          <X size={22} />
        </button>
      </div>

      {/* Items List */}
      <div className="overflow-y-auto h-[75%] pr-2 flex flex-col gap-4">
        {cart.length === 0 && (
          <p className="text-gray-600 text-sm text-center mt-10">
            Your cart is empty.
          </p>
        )}

        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 items-start border-b pb-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-sm mt-1">₹ {item.price}</p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-xs text-red-500 underline mt-2">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout */}
      {cart.length > 0 && (
        <button className="w-full bg-black text-white py-3 rounded-lg mt-4 text-sm">
          Checkout
        </button>
      )}
    </div>
  );
};

export default CartSidebar;
