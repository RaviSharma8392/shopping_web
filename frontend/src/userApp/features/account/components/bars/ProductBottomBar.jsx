import React, { useEffect, useState, useMemo } from "react";
import { Heart, ShoppingBag, Zap } from "lucide-react";

const ProductBottomBar = ({
  product,
  selectedSize,
  selectedColor,
  qty,
  isAdding,
  handleAddToCart,
  handleWishlistToggle,
  isLiked,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Smooth Scroll Logic: Hide on scroll down, show on scroll up
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Format price for the bar
  const displayPrice = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(product?.price * qty);
  }, [product?.price, qty]);

  if (!product) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-2xl border-t border-gray-100 px-4 py-3 pb-safe-area shadow-[0_-10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 z-[100] md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}>
      <div className="flex items-center gap-4 max-w-lg mx-auto">
        {/* 1. Context Info (Price & Selection) */}
        <div className="flex flex-col shrink-0 min-w-[100px]">
          <span className="text-lg font-bold text-gray-900 leading-none">
            {displayPrice}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium mt-1">
            {selectedSize ? `Size: ${selectedSize}` : "Select Size"}
          </span>
        </div>

        {/* 2. Action Buttons */}
        <div className="flex items-center gap-2 flex-1">
          {/* Wishlist Icon Only */}
          <button
            onClick={handleWishlistToggle}
            className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all active:scale-90 ${
              isLiked
                ? "bg-red-50 border-red-100 text-red-500"
                : "bg-gray-50 border-gray-100 text-gray-400"
            }`}>
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>

          {/* Main CTA */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !product.isActive}
            className={`relative flex-1 h-8  font-bold text-[11px] uppercase tracking-[0.15em] transition-all active:scale-95 flex items-center justify-center gap-2 ${
              product.isActive
                ? "bg-black text-white shadow-lg shadow-black/10"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}>
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white  animate-spin" />
            ) : (
              <>
                <ShoppingBag size={16} strokeWidth={2} />
                <span>{isAdding ? "Adding..." : "Add to Bag"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Subtle Progress Bar (Optional Visual) */}
      <div className="absolute top-0 left-0 h-0.5] bg-gray-100 w-full overflow-hidden">
        <div className="h-full bg-black/10 w-1/3 animate-pulse" />
      </div>
    </div>
  );
};

export default ProductBottomBar;
