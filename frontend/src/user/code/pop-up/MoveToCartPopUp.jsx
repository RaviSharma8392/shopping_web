import React, { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import SizeSelector from "../product/SizeSelector";
import { useCart } from "../../context/CartContext";

const MoveToCartPopUp = ({ onClose, product, onCompleted }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const { add } = useCart();

  const handleAdd = async () => {
    await add({
      productId: product.id,
      name: product.name,
      size: selectedSize,
      sizes: product.sizes,
      price: Number(product.price),
      originalPrice: Number(product.originalPrice),
      quantity: 1,
      stock: product.stock,
      image: product.images?.[0],
      slug: product.slug,
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
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white w-[92%] max-w-md rounded-lg shadow-xl p-5 relative animate-fadeIn">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 hover:bg-gray-200 rounded-full transition">
          <X size={20} />
        </button>

        {/* TOP SECTION */}
        <div className="hidden md:flex gap-4">
          {/* IMAGE */}
          <Link to={`/product/${product.slug}`} className="min-w-20">
            <img
              src={product.images?.[0] || product.banner || "/placeholder.jpg"}
              alt={product.name}
              className="w-20 h-20 object-cover"
            />
          </Link>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-col justify-center">
            <Link to={`/product/${product.slug}`}>
              <h3 className="text-sm text-gray-800 leading-tight line-clamp-2 hover:text-[#FF3F6C] transition">
                {product.name}
              </h3>
            </Link>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">₹{price}</span>

              {originalPrice > price && (
                <>
                  <span className="line-through text-xs text-gray-500">
                    ₹{originalPrice}
                  </span>
                  <span className="text-orange-500 text-xs">
                    ({discount}% OFF)
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SIZE SELECTOR */}
        {product.sizes && (
          <div className="mt-6">
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
          </div>
        )}

        {/* DONE BUTTON */}
        <div className="mt-8">
          <button
            onClick={handleAdd}
            className="w-full py-2.5 bg-[#FF3F6C] text-white font-medium rounded-lg hover:bg-gray-900 transition">
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveToCartPopUp;
