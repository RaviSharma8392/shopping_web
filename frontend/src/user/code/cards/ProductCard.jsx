import React, { useState } from "react";
import { Heart, Eye, CarTaxiFront, ShoppingBag, Zap } from "lucide-react";
import ProductQuickView from "../view/ProductQuickView";
import { addToWishlist } from "../../services/wishlistService";
import { useWishlist } from "../../hook/useWishlist";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onMoveToCart }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openQuickView, setOpenQuickView] = useState(false);
  const { isLiked, toggleWishlist, loading } = useWishlist(product.id);

  const navigate = useNavigate();

  const images = product.images || [product.image];

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (
      product.originalPrice &&
      product.price &&
      product.originalPrice > product.price
    ) {
      const discount =
        ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const discount = calculateDiscount();
  const isNewArrival = product.collectionType === "new-arrivals";
  const isOnSale = discount > 0;

  // Format price with Indian numbering system
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  return (
    <>
      <div
        onClick={() => navigate(`/product/${product.slug}`)}
        className="w-40 md:w-80 h-70 md:h-120 group cursor-pointer relative mb-15">
        {/* 🔥 Badges - Discount & New Arrival */}
        <div className="absolute top-0 left-0 z-20 flex flex-col gap-2">
          {isOnSale && (
            <span className="bg-red-500/40 text-white px-2 py-1 text-xs  ">
              {discount}% OFF
            </span>
          )}
          {isNewArrival && (
            <span className="bg-green-500/20 text-white px-2 py-1 text-xs  flex items-center gap-1">
              <Zap size={12} className="fill-current" />
              NEW
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist();
          }}
          disabled={loading}
          className="absolute top-3 right-3 z-20 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-all duration-300">
          <Heart
            size={18}
            className={isLiked ? "text-red-500 fill-red-500" : "text-gray-700"}
          />
        </button>
        {/* 🖼 Product Image Slider */}
        <div className="relative h-60 md:h-110 overflow-hidden  shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-100">
          <img
            src={images[activeIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Image Navigation Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "bg-white scale-125"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          )}

          {/* 👁 Quick View Button */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 to-transparent flex justify-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenQuickView(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full shadow-lg hover:bg-white/40 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
              aria-label="Quick view product details">
              <Eye size={18} /> Quick View
            </button>
          </div> */}

          {/* Mobile Quick Action */}
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenQuickView(true);
            }}
            className="md:hidden absolute bottom-3 right-3 z-20 bg-white/90 rounded-full p-2.5 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
            <ShoppingBag size={16} className="text-gray-700" />
          </button> */}

          {/* Add to cart  Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMoveToCart();
            }}
            className="absolute bottom-3 right-3 z-20 bg-white/90 rounded-full p-2.5 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
            <ShoppingBag size={16} className="text-gray-700" />
          </button>
        </div>
        {/* Product Info */}
        <div className="mt-4 space-y-2">
          {/* Product Name */}
          <h3 className="text-center text-[16px] md:text-[18px] font-[Cardo] text-gray-900 tracking-wide line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Price Display */}
          <div className="text-center ">
            {/* Current Price */}
            {product.price && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-semibold  text-gray-900">
                  ₹{formatPrice(product.price)}
                </span>

                {/* Original Price with Strike-through */}
                {isOnSale && product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            )}

            {/* Starting Price for Variations */}
            {!product.price && product.startingPrice && (
              <p className="text-sm text-gray-700">
                Starting at{" "}
                <span className="font-semibold">
                  ₹{formatPrice(product.startingPrice)}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Right Sidebar Drawer
      <ProductQuickView
        product={product}
        open={openQuickView}
        onClose={() => setOpenQuickView(false)}
      /> */}
    </>
  );
};

export default ProductCard;
