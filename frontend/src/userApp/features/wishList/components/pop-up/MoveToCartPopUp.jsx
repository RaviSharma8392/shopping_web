import React, { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import SizeSelector from "../../../../components/selector/SizeSelector";
import { useCart } from "../../../cart/context/CartContext";

const MoveToCartPopUp = ({ onClose, product, onCompleted }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(""); // Track validation error

  const { addToCart } = useCart();

  const handleAdd = async () => {
    // 1. Validation: If product has sizes, force user to pick one
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setError("Please select a size");
      return;
    }

    // 2. Add to Cart
    await addToCart({
      id: product.id,
      selectedSize: selectedSize,
      selectedQuantity: 1,
    });

    if (onCompleted) onCompleted();
    onClose();
  };

  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);
  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
          <X size={20} />
        </button>

        {/* TOP SECTION (Product Info) */}
        <div className="flex gap-4 mb-6">
          <Link to={`/product/${product.slug}`} className="shrink-0">
            <img
              src={product.images?.[0] || product.banner || "/placeholder.jpg"}
              alt={product.name}
              className="w-20 h-24 object-cover rounded-md border border-gray-100"
            />
          </Link>

          <div className="flex flex-col py-1">
            <h3 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
              {product.name}
            </h3>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900">₹{price}</span>
              {originalPrice > price && (
                <>
                  <span className="line-through text-xs text-gray-400">
                    ₹{originalPrice}
                  </span>
                  <span className="text-orange-600 text-xs font-semibold">
                    ({discount}% OFF)
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SIZE SELECTOR */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-gray-800">
                Select Size
              </span>
              {error && (
                <span className="text-xs text-red-500 font-medium animate-pulse">
                  {error}
                </span>
              )}
            </div>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={(size) => {
                setSelectedSize(size);
                setError(""); // Clear error on select
              }}
            />
          </div>
        )}

        {/* ACTION BUTTON */}
        <button
          onClick={handleAdd}
          className={`
            w-full py-3.5 text-sm font-bold tracking-wide uppercase rounded-lg transition-all
            ${
              !product.sizes || selectedSize
                ? "bg-[#FF3F6C] text-white hover:bg-[#e6355e] shadow-lg shadow-pink-200"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }
          `}>
          Done
        </button>
      </div>
    </div>
  );
};

export default MoveToCartPopUp;
