import React, { useEffect, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import CustomButton from "../button/CustomButton";

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
  const [show, setShow] = useState(true);

  useEffect(() => {
    let lastScroll = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      clearTimeout(scrollTimeout);

      if (currentScroll > lastScroll && currentScroll > 100) {
        setShow(false);
      } else {
        setShow(true);
      }

      lastScroll = currentScroll;
      scrollTimeout = setTimeout(() => setShow(false), 3000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  if (!product) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg shadow-2xl border-t border-gray-200 p-4 transition-all duration-500 z-50 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      } md:hidden`}>
      <div className="flex items-center justify-between max-w-md mx-auto gap-3">
        {/* Wishlist Button */}
        <CustomButton
          text={isLiked ? "Wishlisted" : "Wishlist"}
          icon={
            <Heart
              className={`w-5 h-5 ${isLiked ? "text-red-500" : "text-black"}`}
            />
          }
          onClick={handleWishlistToggle}
          bgColor="white"
          textColor="text-black"
          className="border border-gray-400"
        />

        {/* Add to Cart Button */}
        <CustomButton
          text={isAdding ? "Adding..." : "Add to Cart"}
          icon={<ShoppingBag className="w-5 h-5 text-white" />}
          loading={isAdding}
          onClick={handleAddToCart}
          disabled={!product.isActive}
          bgColor="bg-[#B4292F]"
          hoverBgColor="hover:bg-[#9c2227]"
          textColor="text-white"
          className="py-4"
        />
      </div>
    </div>
  );
};

export default ProductBottomBar;
