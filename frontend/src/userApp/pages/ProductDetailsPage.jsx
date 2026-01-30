import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, AlertCircle, ShoppingCart, Zap } from "lucide-react";

// Hooks & Context
import { useProducts } from "../features/product/hook/useProducts";
import { useWishlist } from "../features/wishList/hook/useWishlist";

// Specialized Components
import Notification from "../../shared/components/Notification";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductAccordion from "../components/product/ProductAccordion";
import RelatedProducts from "../components/product/RelatedProducts";
import NavigationBar from "../components/navigationBar/NavigationBar";
import ProductBottomBar from "../features/account/components/bars/ProductBottomBar";
import MainHeader from "../components/mainHeader/MainHeader";
const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug, loading, error } = useProducts();

  // State Management
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const { isLiked, addToWishlist, removeFromWishlist } = useWishlist(
    product?.id,
  );

  // Load Product Data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductBySlug(slug);
        if (data) {
          setProduct(data);
          if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
          if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    loadProduct();
    window.scrollTo(0, 0); // Reset scroll on new product
  }, [slug, getProductBySlug]);

  // Derived State (Optimized with useMemo)
  const discountPercentage = useMemo(() => {
    if (!product?.originalPrice || !product?.price) return 0;
    if (product.originalPrice <= product.price) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );
  }, [product]);

  // Handlers
  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
  }, []);

  const handleWishlistToggle = () => {
    if (isLiked) {
      removeFromWishlist();
      showNotification("info", "Removed from wishlist");
    } else {
      addToWishlist(product);
      showNotification("success", "Saved to wishlist!");
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      showNotification("error", "Please select size and color");
      return;
    }
    setIsAdding(true);
    // Simulate API Call
    setTimeout(() => {
      setIsAdding(false);
      showNotification("success", "Added to your bag!");
    }, 800);
  };

  // UI Helpers
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const renderStars = (rating = 0) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={`${i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1 mt-0.5">
        ({product?.reviewsCount || 0})
      </span>
    </div>
  );

  // Loading State
  if (loading) return <LoadingSkeleton />;

  // Error State
  if (error || !product) return <ErrorState navigate={navigate} />;

  return (
    <div className="min-h-screen  bg-white">
      <MainHeader />
      {/* Dynamic Header/Breadcrumb */}
      <div className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
          <NavigationBar product={product} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          {/* Left: Gallery (Occupies 7/12 cols) */}
          <div className="lg:col-span-7">
            <ProductImageGallery
              images={product.images}
              activeIndex={activeImageIndex}
              onImageChange={setActiveImageIndex}
              productName={product.name}
              discountBadge={
                discountPercentage > 0 ? `${discountPercentage}% OFF` : null
              }
            />
          </div>

          {/* Right: Actions & Info (Occupies 5/12 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <ProductInfo
              product={product}
              discount={discountPercentage}
              renderStars={renderStars}
              formatPrice={formatPrice}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              handleAddToCart={handleAddToCart}
              handleBuyNow={() => navigate("/checkout")}
              handleWishlistToggle={handleWishlistToggle}
              isLiked={isLiked}
              isAdding={isAdding}
            />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-gray-50 rounded-full">
                  <ShoppingCart size={18} />
                </div>
                <p>Free Shipping over ₹999</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-gray-50 rounded-full">
                  <Zap size={18} />
                </div>
                <p>Fast 2-Day Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <section className="mt-20 border-t border-gray-100 pt-16">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold mb-8 italic font-serif">
              Product Story
            </h3>
            <ProductAccordion product={product} />
          </div>
        </section>

        {/* Cross-selling */}
        <section className="mt-24">
          <RelatedProducts
            currentProductId={product.id}
            categoryId={product.categoryId}
          />
        </section>
      </main>

      {/* Global Components */}
      {notification && (
        <Notification {...notification} onClose={() => setNotification(null)} />
      )}

      {/* Mobile Sticky Bar */}
      <ProductBottomBar
        product={product}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
      />
    </div>
  );
};

// Sub-components for cleaner code
const LoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
  </div>
);

const ErrorState = ({ navigate }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <AlertCircle size={48} className="text-red-500 mb-4" />
    <h2 className="text-2xl font-bold mb-2">Item not found</h2>
    <p className="text-gray-500 mb-6">
      This product might have been moved or sold out.
    </p>
    <button
      onClick={() => navigate("/")}
      className="px-8 py-3 bg-black text-white rounded-full font-medium">
      Back to Shop
    </button>
  </div>
);

export default ProductDetailsPage;
