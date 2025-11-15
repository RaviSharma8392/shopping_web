import React, { useState } from "react";
import { Heart, Eye, CarTaxiFront, ShoppingBag } from "lucide-react";
import ProductQuickView from "../view/ProductQuickView";
import { addToWishlist } from "../../services/wishlistService";
import { useWishlist } from "../../hook/useWishlist";

const ProductCard = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openQuickView, setOpenQuickView] = useState(false);
  const { isLiked, setIsLiked } = useWishlist(product.id);
  console.log(product);

  const images = product.images || [product.image];
  console.log(5 > 1);

  return (
    <>
      <div className="w-40 md:w-80 h-70 md:h-120 group cursor-pointer relative mb-5 ">
        {/* ❤️ Wishlist Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product);
            setIsLiked(true); // instantly update UI
          }}
          className="absolute top-3 right-3 z-20 bg-white/80 rounded-full p-1 md:p-2 shadow hover:bg-white transition">
          <Heart
            size={18}
            className={isLiked ? "text-red-500 fill-red-500" : "text-gray-700"}
          />
        </button>

        {/* 🖼 Product Image Slider */}
        <div
          className="relative h-60 md:h-110
         overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
          <img
            src={images[activeIndex]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* 👁 Quick View Button */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex justify-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click from interfering
                setOpenQuickView(true);
              }}
              className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full shadow-lg
                hover:bg-white/40 transform hover:scale-105 transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75
              "
              aria-label="Quick view product details">
              <Eye size={18} /> Quick View
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from interfering
              setOpenQuickView(true);
            }}
            className="md:hidden absolute bottom-2 right-3 z-20 bg-white/80 rounded-full p-3 shadow hover:bg-white transition">
            <ShoppingBag size={18} className="text-gray-700" />
          </button>
        </div>
        {/* ◉ Dots
        {5 > 1 && (
          <div className=" bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                  activeIndex === idx ? "bg-black" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )} */}
        {/* Product Name */}
        <h3 className="mt-3 text-center  text-[16px] md:text-[18px] font-[Cardo] text-gray-900 tracking-wide">
          {product.name}
        </h3>
        {/* Price */}
        {product.price && (
          <p className="text-sm text-center text-gray-700">
            <span className="font-semibold">₹{product.price}</span>
          </p>
        )}
      </div>

      {/* ✅ Right Sidebar Drawer */}
      <ProductQuickView
        product={product}
        open={openQuickView}
        onClose={() => setOpenQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
