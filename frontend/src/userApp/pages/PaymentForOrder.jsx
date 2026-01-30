import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../features/auth/context/UserContext";
import { useCart } from "../context/CartContext";

const PLATFORM_FEE = 50;
const DELIVERY_FEE = 0;

const PaymentPage = ({ selectedAddress }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clear } = useCart();

  const [loading, setLoading] = useState(false);

  const selectedItems = cart; // or selected items from checkout

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalAmount = subtotal + PLATFORM_FEE + DELIVERY_FEE;

  const placeOrder = async () => {
    if (!user || !selectedAddress) {
      alert("Missing user or address");
      return;
    }

    setLoading(true);

    try {
      // Create order WITHOUT paymentMethod
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        addressId: selectedAddress.id,
        items: selectedItems.map((item) => ({
          productId: item.id,
          name: item.name,
          image: item.images?.[0], // only 1 image
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal,
        platformFee: PLATFORM_FEE,
        deliveryFee: DELIVERY_FEE,
        totalAmount,
        orderStatus: "PLACED", // order created immediately
        createdAt: serverTimestamp(),
      });

      clear(); // clear cart
      navigate("/order-success"); // redirect to success page
    } catch (error) {
      console.error("Order failed", error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* ADDRESS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold text-lg mb-2">Delivery Address</h2>
        {/* <p className="text-sm">{selectedAddress.fullAddress}</p> */}
      </div>

      {/* ITEMS */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="font-semibold text-lg">Order Summary</h2>

        {selectedItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* PRICE */}
      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Platform Fee</span>
          <span>₹{PLATFORM_FEE}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* PLACE ORDER */}
      <button
        disabled={loading}
        onClick={placeOrder}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50">
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default PaymentPage;
