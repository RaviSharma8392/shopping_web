import React, { useMemo } from "react";
import { ShoppingBag, Zap, ShieldCheck, Heart } from "lucide-react";
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
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  handleQuantityChange,
  handleAddToCart,
  handleBuyNow,
  handleWishlistToggle,
  isLiked,
  isAdding,
  isActive,
}) => {
  // Logic for low stock warning
  const isLowStock = useMemo(
    () => product.stock > 0 && product.stock < 5,
    [product.stock],
  );

  return (
    <div className="space-y-8 font-inter animate-in fade-in slide-in-from-right-4 duration-700">
      {/* 1. Header & Rating */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-4xl font-serif font-medium text-gray-900 leading-tight">
            {product.name}
          </h1>
          <button
            onClick={handleWishlistToggle}
            className={`p-2.5 rounded-full border transition-all duration-300 ${
              isLiked
                ? "bg-red-50 border-red-100 text-red-500"
                : "bg-white border-gray-100 text-gray-400 hover:text-black"
            }`}>
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {renderStars(product.rating || 4.5)}
          <span className="text-[11px] uppercase tracking-widest text-gray-400 border-l pl-3 border-gray-200">
            {product.sku || "MN-0921"}
          </span>
        </div>

        <PriceInfo
          product={product}
          discount={discount}
          formatPrice={formatPrice}
        />
      </div>

      <div className="h-[1px] bg-gradient-to-r from-gray-100 via-gray-50 to-transparent" />

      {/* 2. Selection Controls */}
      <div className="space-y-6">
        {product.colors?.length > 0 && (
          <div className="space-y-3">
            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </div>
        )}

        {product.sizes?.length > 0 && (
          <div className="space-y-3">
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
          </div>
        )}

        <div className="flex items-end gap-6">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
              Quantity
            </label>
            <QuantitySelector
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
              stock={product.stock || 10}
            />
          </div>

          {/* Low Stock Indicator */}
          {isLowStock && (
            <p className="text-xs text-amber-600 font-medium pb-2 animate-pulse">
              Only {product.stock} left in stock!
            </p>
          )}
        </div>
      </div>

      {/* 3. Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <CustomButton
          text={isAdding ? "Adding..." : "Add to Bag"}
          icon={<ShoppingBag className="w-4 h-4" strokeWidth={1.5} />}
          loading={isAdding}
          onClick={handleAddToCart}
          disabled={!isActive}
          className="w-full h-14 rounded-full uppercase text-[11px] tracking-[0.2em] font-bold transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
          bgColor="#000000"
          textColor="text-white"
        />

        <CustomButton
          text="Instant Checkout"
          icon={<Zap className="w-4 h-4" strokeWidth={1.5} />}
          onClick={handleBuyNow}
          disabled={!isActive}
          className="w-full h-14 rounded-full uppercase text-[11px] tracking-[0.2em] font-bold border-2 border-black hover:bg-gray-50 transition-all"
          bgColor="transparent"
          textColor="text-black"
        />
      </div>

      {/* 4. Secondary Trust & Share */}
      <div className="pt-6 space-y-6">
        <div className="flex items-center gap-6 py-4 border-y border-gray-50">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500">
            <ShieldCheck size={16} className="text-green-600" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-500">
            <Zap size={16} className="text-amber-500" />
            <span>Fast Dispatch</span>
          </div>
        </div>

        <ShareSection />

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <TrustBadges />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
