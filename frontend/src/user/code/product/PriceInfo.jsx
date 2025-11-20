import React from "react";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import {
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";

export const PriceInfo = ({ product, discount, formatPrice }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-3 flex-wrap">
      <span>MRP</span>
      <span className="text-xl text-gray-500 line-through">
        ₹{formatPrice(product.originalPrice)}
      </span>

      {discount > 0 && (
        <>
          <span className="text-md font-bold text-gray-900">
            ₹{formatPrice(product.price)}
          </span>
          <span className="bg-red-500 text-white px-2 py-1 text-sm font-semibold rounded">
            {discount}% OFF!
          </span>
        </>
      )}
    </div>
    <div className="flex items-center gap-2">
      <p className="text-sm text-gray-500">Inclusive of all taxes</p>
      <span
        className={`px-2 py-1 text-sm font-medium rounded ${
          product.isActive
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
        {product.isActive ? "In Stock" : "Out of Stock"}
      </span>
    </div>
  </div>
);

// Action Buttons
// const ActionButtons = ({ handleAddToCart, handleBuyNow, isActive }) => (
//   <div className="flex flex-col sm:flex-row gap-4 pt-4">
//     <button
//       onClick={handleAddToCart}
//       disabled={!isActive}
//       className="flex-1 bg-[#B4292F] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#9c2227] transition-colors flex items-center justify-center gap-2">
//       <ShoppingBag className="w-5 h-5" />
//       Add to Cart
//     </button>
//     <button
//       onClick={handleBuyNow}
//       disabled={!isActive}
//       className="flex-1 bg-gray-900 text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
//       Buy Now
//     </button>
//   </div>
// );
