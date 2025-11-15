import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import QuickViewImages from "../quickView/QuickViewImages";
import QuickViewSizes from "../quickView/QuickViewSizes";
import QuickViewColors from "../quickView/QuickViewColors";
import QuickViewQuantity from "../quickView/QuickViewQuantity";
import { useQuickView } from "../../hook/useQuickView";

const ProductQuickView = ({ product, open, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    images,
    activeImage,
    setActiveImage,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    qty,
    setQty,
    isMobile,
  } = useQuickView(product);

  if (!product) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white shadow-xl transition-all p-6 fixed
          ${
            isMobile
              ? "left-0 right-0 bottom-0 rounded-t-3xl"
              : "top-0 right-0 h-full w-[420px]"
          }
          ${
            open
              ? isMobile
                ? "translate-y-0"
                : "translate-x-0"
              : isMobile
              ? "translate-y-full"
              : "translate-x-full"
          }
        `}>
        {/* CLOSE BTN */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-black transition">
          <X size={24} />
        </button>

        {/* IMAGES */}
        <QuickViewImages
          images={images}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />

        {/* NAME + PRICE */}
        <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>

        <p className="text-xl font-semibold text-pink-600 mt-1">
          ₹{product.price}
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          {product.description ||
            "Premium handcrafted piece designed for comfort and elegance."}
        </p>

        {/* SIZES */}
        <QuickViewSizes
          sizes={product.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        {/* COLORS */}
        <QuickViewColors
          colors={product.colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />

        {/* QUANTITY */}
        <QuickViewQuantity qty={qty} setQty={setQty} />

        {/* ADD TO CART */}
        <button
          onClick={() =>
            addToCart({
              ...product,
              selectedSize,
              selectedColor,
              qty,
              selectedImage: activeImage,
            })
          }
          className="w-full mt-6 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition">
          Add to Cart
        </button>

        {/* VIEW DETAILS */}
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="mt-4 w-full py-3 border rounded-xl font-semibold hover:bg-gray-100 transition">
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default ProductQuickView;
