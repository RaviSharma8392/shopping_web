import React, { useMemo } from "react";
import {
  ShoppingBag,
  Zap,
  ShieldCheck,
  Heart,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { TrustBadges } from "../badges/TrustBadges";
import CustomButton from "../button/CustomButton";
import { ShareSection } from "../section/ShareSectionNew";
import QuantitySelector from "../../../components/unit/QuantitySelector";
import { PriceInfo } from "./PriceInfo";
import ColorSelector from "./ColorSelector";
import SizeSelector from "../selector/SizeSelector";

const ProductInfo = ({
  product,
  discount,
  renderStars,
  formatPrice,

  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity, // Changed from handleQuantityChange to match typical useState setter
  handleAddToCart,
  handleBuyNow,
  handleWishlistToggle,
  isWishlisted, // Changed from isLiked to match parent
  isAdding,
}) => {
  // Logic for low stock warning
  const isLowStock = useMemo(
    () => product.stock > 0 && product.stock < 5,
    [product.stock],
  );

  return (
    <div className="space-y-8 font-sans animate-in fade-in slide-in-from-right-4 duration-700">
      {/* 1. Header & Rating */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-serif font-medium text-gray-900 leading-tight">
            {product.name}
          </h1>
          <button
            onClick={handleWishlistToggle}
            className={`p-3 rounded-full border transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0 ${
              isWishlisted
                ? "bg-red-50 border-red-100 text-red-500 shadow-sm"
                : "bg-white border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100"
            }`}>
            <Heart
              size={20}
              fill={isWishlisted ? "currentColor" : "none"}
              strokeWidth={2}
            />
          </button>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {renderStars(product.rating || 4.5)}
          <div className="h-4 w-[1px] bg-gray-200" />
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
            SKU: {product.sku || "MN-0000"}
          </span>
        </div>

        <PriceInfo
          product={product}
          discount={discount}
          formatPrice={formatPrice}
        />
      </div>

      <div className="h-[1px] bg-gradient-to-r from-gray-200 via-gray-100 to-transparent" />

      {/* 2. Selection Controls */}
      <div className="space-y-8">
        {/* Size Selector */}
        {product.sizes?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-900">
                Select Size
              </span>
              <button className="text-xs text-red-600 font-bold underline decoration-red-200 underline-offset-4 hover:text-red-700">
                Size Chart
              </button>
            </div>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
          </div>
        )}

        {/* Quantity & Stock */}
        <div className="flex items-end gap-8">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-900 block">
              Quantity
            </label>
            <QuantitySelector
              quantity={quantity}
              handleQuantityChange={setQuantity}
              stock={product.stock || 10}
            />
          </div>

          {/* Low Stock Indicator */}
          {isLowStock && (
            <div className="pb-3 flex items-center gap-2 text-amber-600 animate-pulse">
              <Zap size={14} fill="currentColor" />
              <p className="text-xs font-bold">Only {product.stock} left!</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Primary Actions */}
      <div className="hidden md:flex flex-col sm:flex-row gap-4 pt-4">
        <CustomButton
          text={isAdding ? "Adding..." : "Add to Cart"}
          icon={<ShoppingBag className="w-5 h-5" strokeWidth={2} />}
          loading={isAdding}
          onClick={handleAddToCart}
          className="flex-1 h-14 rounded-full uppercase text-xs tracking-[0.15em] font-bold shadow-lg shadow-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
          bgColor="#111827" // Tailwind Gray-900
          textColor="text-white"
        />

        <CustomButton
          text="Add to Wishlist"
          icon={<Zap className="w-5 h-5" strokeWidth={2} />}
          onClick={handleBuyNow}
          className="flex-1 h-14 rounded-full uppercase text-xs tracking-[0.15em] font-bold border-2 border-gray-900 hover:bg-gray-50 transition-all duration-300"
          bgColor="white"
          textColor="text-gray-900"
        />
      </div>

      {/* 4. Secondary Trust & Share */}
      <div className="pt-8 space-y-6">
        {/* Mini Features */}
        {/* <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
          <div className="flex items-center gap-3">
            <Truck size={20} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 uppercase">
                Free Shipping
              </span>
              <span className="text-[10px] text-gray-500">
                On orders over ₹999
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCcw size={20} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 uppercase">
                Easy Returns
              </span>
              <span className="text-[10px] text-gray-500">
                7-day return policy
              </span>
            </div>
          </div>
        </div> */}

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Share this product
          </span>
          <ShareSection />
        </div>

        <div className="p-5 bg-gray-50 rounded-xl border border-gray-100/50">
          <TrustBadges />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
