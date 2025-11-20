import { ShoppingBag } from "lucide-react";
import { TrustBadges } from "../badges/TrustBadges";
import CustomButton from "../button/CustomButton";
import { ShareSection } from "../section/ShareSectionNew";
import ColorSelector from "./ColorSelector";
import { PriceInfo } from "./PriceInfo";
import { QuantitySelector } from "./QuantitySelector";
import SizeSelector from "./SizeSelector";

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
  isAdding,
  isActive,
}) => {
  return (
    <div className="space-y-6 font-inter">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-md md:text-3xl font-playfair text-gray-900">
          {product.name}
        </h1>
        <PriceInfo
          product={product}
          discount={discount}
          formatPrice={formatPrice}
        />
      </div>

      {/* Color & Size */}
      {product.colors?.length > 0 && (
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onColorChange={setSelectedColor}
        />
      )}
      {product.sizes?.length > 0 && (
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSizeChange={setSelectedSize}
        />
      )}

      {/* Quantity */}
      <QuantitySelector
        quantity={quantity}
        handleQuantityChange={handleQuantityChange}
        stock={product.stock || 10}
      />

      {/* Actions */}
      <div className="hidden md:flex sm:flex-row gap-4 pt-4">
        {/* Add to Cart */}
        <CustomButton
          text={isAdding ? "Adding..." : "Add to Cart"}
          icon={<ShoppingBag className="w-5 h-5" />}
          loading={isAdding}
          onClick={handleAddToCart}
          disabled={!isActive}
          bgColor="#ff356c"
          //   bgColor="#B4292F"
          hoverBgColor="hover:bg-[#9c2227]"
          textColor="text-white"
        />

        {/* Buy Now */}
        <CustomButton
          text="Buy Now"
          onClick={handleBuyNow}
          disabled={!isActive}
          //   bgColor="bg-gray-900"
          hoverBgColor="hover:bg-gray-800"
          textColor="text-white"
        />
      </div>

      {/* Share */}
      <ShareSection />

      {/* Trust Badges */}
      <TrustBadges />
    </div>
  );
};

export default ProductInfo;
