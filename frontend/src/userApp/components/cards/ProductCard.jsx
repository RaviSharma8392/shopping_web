import React, { useState } from "react";
import { Heart, ShoppingBag, Zap, Check } from "lucide-react"; // Import Check icon
import { useWishlist } from "../../features/wishList/context/WishlistContext";
import { useCart } from "../../features/cart/context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false); // New state for button animation

  const {
    isWishlisted,
    toggleWishlist,
    loading: wishlistLoading,
  } = useWishlist();

  const { addToCart, syncing: cartSyncing } = useCart();

  const navigate = useNavigate();
  const isLiked = isWishlisted(product.id);
  const images = product.images?.length > 0 ? product.images : [product.image];

  /* ------------------------- Price & Discount Logic ------------------------- */
  const calculateDiscount = () => {
    if (
      product.originalPrice &&
      product.price &&
      product.originalPrice > product.price
    ) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      );
    }
    return 0;
  };

  const discount = calculateDiscount();
  const isNewArrival = product.collectionType === "new-arrivals";
  const formatPrice = (price) => new Intl.NumberFormat("en-IN").format(price);

  /* ------------------------- Handlers ------------------------- */
  const handleWishlist = async (e) => {
    e.stopPropagation();
    try {
      await toggleWishlist(product.id);
    } catch (err) {
      console.error("Wishlist error", err);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    try {
      await addToCart({
        id: product.id,
        selectedSize: "",
        selectedQuantity: 1,
      });

      // 1. Trigger Visual Feedback (Green Button)
      setIsAdded(true);

      // 2. Show Alert (Or use toast.success("Added to cart") if you install react-hot-toast)
      alert(`${product.name} added to cart!`);

      // 3. Reset Button after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add to cart. Please try again.");
    }
  };

  /* ------------------------- JSX ------------------------- */
  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="w-40 md:w-80 group cursor-pointer relative mb-8">
      {/* ... Badges and Wishlist Code (Unchanged) ... */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
        {discount > 0 && (
          <span className="bg-red-500 text-white px-2 py-1 text-[10px] md:text-xs font-bold tracking-wider uppercase">
            {discount}% OFF
          </span>
        )}
        {isNewArrival && (
          <span className="bg-emerald-600 text-white px-2 py-1 text-[10px] md:text-xs font-bold tracking-wider flex items-center gap-1">
            <Zap size={10} className="fill-current" />
            NEW
          </span>
        )}
      </div>

      <button
        onClick={handleWishlist}
        disabled={wishlistLoading}
        className="absolute top-2 right-2 z-20 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-300">
        <Heart
          size={18}
          className={`transition-colors duration-300 ${
            isLiked
              ? "text-red-500 fill-red-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
        />
      </button>

      {/* 🖼 Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm">
        <img
          src={images[activeIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-gray-800 w-3"
                    : "bg-gray-400 hover:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}

        {/* 🛒 Add to Cart Button (Updated) */}
        <button
          onClick={handleAddToCart}
          disabled={cartSyncing || isAdded}
          // 🔥 FIXED: Typo 'bg-blacktext-white' -> 'bg-black text-white'
          // 🔥 ADDED: Dynamic color change (Black -> Green)
          className={`absolute bottom-3 right-3 z-20 rounded-full p-3 shadow-lg 
                     transition-all duration-300 transform
                     ${
                       isAdded
                         ? "bg-green-600 text-white scale-110"
                         : "bg-black text-white hover:bg-gray-800"
                     }`}
          title="Add to Cart">
          {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
        </button>
      </div>

      {/* 📝 Product Info */}
      <div className="mt-3 space-y-1">
        <h3 className="text-base font-medium text-gray-900 line-clamp-1 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>

        {product.price ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">
              ₹{formatPrice(product.price)}
            </span>
            {discount > 0 && product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Starting at{" "}
            <span className="font-semibold text-gray-900">
              ₹{formatPrice(product.startingPrice)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
