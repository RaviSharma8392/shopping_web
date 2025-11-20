import React from "react";

const CartSummary = ({
  subtotal,
  originalTotalPrice,
  platformFee = 0,
  selectedItems,
  onPlaceOrder,
}) => {
  const total = subtotal + platformFee;
  const discountOnMrp = Number((originalTotalPrice - subtotal).toFixed(2));

  return (
    <div className=" bg-white rounded-lg shadow-sm p-4 w-full max-w-md mx-auto">
      <h2 className="text-sm font-semibold text-black/60  uppercase mb-4">
        Price Details{" "}
        <span className="lowercase ">({selectedItems.length} items)</span>
      </h2>

      {/* Subtotal */}
      <div className="flex justify-between py-1">
        <span className="text-sm  text-black/60 ">Total MRP</span>
        <span className="text-sm  text-black/60">₹{originalTotalPrice}</span>
      </div>
      {/* Subtotal */}
      <div className="flex justify-between py-1">
        <span className="text-sm  text-black/60 ">Discount on MRP</span>
        <span className="text-sm  text-green-600">-₹{discountOnMrp}</span>
      </div>

      {/* Platform Fee */}
      <div className="flex justify-between py-1">
        <span className="text-sm  text-black/60">Platform Fee</span>
        <span className="text-sm  text-black/60">
          {platformFee === 0 ? "FREE" : `₹${platformFee}`}
        </span>
      </div>

      <hr className="my-2 border-gray-300" />

      {/* Total */}
      <div className="flex justify-between py-1">
        <span className="font-semibold text-sm text-gray-900">Order Total</span>
        <span className="font-bold text-sm text-gray-900">₹{total}</span>
      </div>

      {/* Place Order button */}
      <button
        onClick={onPlaceOrder}
        className="bg-[#FF3F6C] uppercase text-white font-semibold py-1.5 w-full  mt-5 shadow hover:bg-pink-600 transition">
        Place Order
      </button>
    </div>
  );
};

export default CartSummary;
