import React from "react";
import { Trash2, ShoppingCart, Cross, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../hook/useWishlist";
// import { useCart } from "../../hook/useCart"; // <--- Add this import

export const WishlistCard = ({
  product,
  showNotification,
  reloadWishlist,
  onMoveToCart,
}) => {
  const { removeFromWishlist } = useWishlist();
  // const { addToCart } = useCart(); // <--- Uncomment this line

  // --- Calculations and Status Logic ---
  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const stockText = !isInStock
    ? "Out of Stock"
    : isLowStock
    ? "Low Stock!"
    : "In Stock";

  // Price Calculation: Convert to numbers and calculate discount
  const price = Number(product.price);
  const originalPrice = Number(product.originalPrice);
  const discount =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  // --- Action Handlers (Keep the logic the same) ---
  const handleRemove = async () => {
    try {
      await removeFromWishlist(product.id);
      showNotification("Item successfully removed from Wishlist.", "success");
      reloadWishlist();
    } catch (err) {
      showNotification("Failed to remove item. Please try again.", "error");
    }
  };

  return (
    <div className="border border-gray-200  overflow-hidden  transition-all duration-300 hover:shadow-lg bg-white flex flex-col h-full w-full">
      {/* 1. Image and Remove Button */}
      <div className="relative shrink-0">
        <Link to={`/product/${product.slug}`} className="block">
          <img
            src={product.images?.[0] || product.banner || "/placeholder.jpg"}
            alt={product.name}
            // Responsive height: h-56 on mobile, lg:h-72 on larger screens
            className="w-[250px] h[250px] lg:h-[300px] md:w-[500px] object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        </Link>

        {/* Permanent Remove Button */}
        <button
          onClick={handleRemove}
          aria-label="Remove from Wishlist"
          className="absolute top-3 right-3 p-1 rounded-full shadow-lg bg-white/50 text-gray-600 hover:bg-red-100 hover:scale-110 transition duration-200 z-10">
          <X size={18} />
        </button>
      </div>

      {/* 2. Product Details */}
      <div className="p-3 md:p-4 grow flex flex-col">
        <Link to={`/product/${product.slug}`} className="grow">
          {/* Product Name */}
          <h3 className="font-semibold  text-xs md:text-base text-gray-800 hover:text-[#FF3F6C] transition line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Price and Discount */}
        <div className="flex flex-col mt-2">
          <p className="text-[12px] md:text-lg text-gray-900 leading-none">
            ₹
            <span className="font-bold text-[12px] md:text-lg text-gray-900 leading-none">
              {" "}
              {price.toLocaleString()}
            </span>
            {/* Original Price and Discount */}
            {originalPrice > price && (
              <>
                <span className="line-through text-gray-500 ml-2 text-xs md:text-sm">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="text-orange-500 text-xs ml-2  md:text-sm">
                  ({discount}% OFF)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {/* 3. Action Button (Move to Bag) */}
      <div className="p-0 border-t border-gray-100">
        <button
          onClick={onMoveToCart}
          disabled={!isInStock}
          // The button uses the custom brand color and adapts based on stock status
          className={`w-full font-semibold text-[12px] py-3 tracking-wider uppercase flex items-center justify-center transition duration-300 rounded-b-lg 
            ${
              isInStock
                ? "text-[#FF3F6C]"
                : "text-gray-500 bg-gray-100 cursor-not-allowed"
            }
          `}>
          {isInStock ? "MOVE TO BAG" : "OUT OF STOCK"}
        </button>
      </div>
    </div>
  );
};
