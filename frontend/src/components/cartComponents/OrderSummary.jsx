import React from "react";
import { NavLink } from "react-router-dom";

const OrderSummary = ({ subtotal, deliveryFee, total, onPlaceOrder }) => {
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(value);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">{formatPrice(deliveryFee)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-lg text-orange-600">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {subtotal > 0 && subtotal < 299 && (
        <p className="text-sm text-red-500 mb-4">Minimum order value is ₹299</p>
      )}

      <NavLink
        // onClick={onPlaceOrder}
        to={"/checkout"}
        disabled={!subtotal || subtotal < 299}
        className={`w-full py-3 px-4 rounded-lg font-bold text-white transition ${
          !subtotal || subtotal < 299
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}>
        PROCEED TO CHECKOUT
      </NavLink>
    </div>
  );
};

export default OrderSummary;
