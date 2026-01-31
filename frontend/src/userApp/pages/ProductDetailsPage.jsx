import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  AlertCircle,
  Truck,
  ShieldCheck,
  Zap,
  ArrowRight,
  X,
  LogIn,
} from "lucide-react";

// Hooks & Context
import { useProducts } from "../features/product/hook/useProducts";
import { useWishlist } from "../features/wishList/context/WishlistContext";
import { useCart } from "../features/cart/context/CartContext";
import { useAuth } from "../features/auth/context/UserContext";

// Components
import Notification from "../../shared/components/Notification";
import ProductImageGallery from "../components/product/ProductImageGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductAccordion from "../components/product/ProductAccordion";
import RelatedProducts from "../components/product/RelatedProducts";
import NavigationBar from "../components/navigationBar/NavigationBar";
import ProductBottomBar from "../features/account/components/bars/ProductBottomBar";
import CustomButton from "../components/button/CustomButton";
import LoginPoup from "../components/pop-up/LoginPoup";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // APIs & Context
  const { getProductBySlug, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth(); // 🔥 Check Login Status

  // State
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // UI State
  const [notification, setNotification] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // 🔥 Modal State

  // Wishlist Context
  const { isWishlisted, add: addToWishlist } = useWishlist(product?.id);

  // 1. Load Product Data
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
    window.scrollTo(0, 0);
  }, [slug, getProductBySlug]);

  // 2. Discount Calculation
  const discountPercentage = useMemo(() => {
    if (!product?.originalPrice || !product?.price) return 0;
    if (product.originalPrice <= product.price) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );
  }, [product]);

  // 3. Notification Helper
  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // 4. Handle Wishlist
  const handleWishlistToggle = () => {
    if (!product) return;

    // Optional: Also force login for wishlist if you want
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    addToWishlist();
    showNotification(
      "info",
      isWishlisted ? "Removed from wishlist" : "Added to your wishlist",
    );
  };

  // 5. Handle Add To Cart (With Login Check)
  const handleAddToCart = async (redirect = false) => {
    // 🔥 STEP 1: Check Auth
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // STEP 2: Validation
    if (product.sizes?.length > 0 && !selectedSize) {
      showNotification("error", "Please select a size");
      return;
    }

    setIsAdding(true);

    try {
      const cartItem = {
        id: product.id,
        selectedSize: selectedSize,
        selectedQuantity: quantity,
      };

      await addToCart(cartItem);

      if (redirect) {
        navigate("/checkout/cart");
      } else {
        showNotification("success", "Successfully added to bag!");
      }
    } catch (err) {
      showNotification("error", "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  // --- RENDERS ---

  const renderStars = (rating = 4.5) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-200 fill-gray-100"
          }
        />
      ))}
      <span className="text-xs font-medium text-gray-500 ml-1.5 mt-0.5 border-b border-gray-300 pb-0.5">
        {product?.reviewsCount || 128} Reviews
      </span>
    </div>
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  if (loading) return <LoadingSkeleton />;
  if (error || !product) return <ErrorState navigate={navigate} />;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-pink-100 selection:text-pink-900 relative">
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-2">
            <ArrowRight className="rotate-180" size={16} /> Back
          </Link>
          <div className="hidden md:block font-bold text-sm tracking-wide uppercase truncate max-w-xs">
            {product.name}
          </div>
          <NavigationBar product={product} />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          {/* LEFT: IMAGES */}
          <div className="lg:col-span-7 h-fit lg:sticky lg:top-24 transition-all">
            <ProductImageGallery
              images={product.images}
              activeIndex={activeImageIndex}
              onImageChange={setActiveImageIndex}
              productName={product.name}
              discountBadge={
                discountPercentage > 0 ? (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                    {discountPercentage}% OFF
                  </span>
                ) : null
              }
            />
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:col-span-5 space-y-8 animate-fade-in-up">
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
              handleAddToCart={() => handleAddToCart(false)}
              // handleBuyNow={handleBuyNow}
              handleWishlistToggle={handleWishlistToggle}
              isWishlisted={isWishlisted}
              isAdding={isAdding}
            />
            <div className="pt-4">
              <ProductAccordion product={product} />
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <section className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold font-serif text-gray-900">
              You May Also Like
            </h3>
            <Link
              to="/new-in"
              className="text-sm font-bold text-red-600 hover:text-red-700 underline decoration-red-200 underline-offset-4">
              View All
            </Link>
          </div>
          <RelatedProducts
            currentProductId={product.id}
            categoryId={product.categoryId}
          />
        </section>
      </main>

      {/* NOTIFICATION */}
      {notification && (
        <Notification {...notification} onClose={() => setNotification(null)} />
      )}

      {/* MOBILE BOTTOM BAR */}
      <ProductBottomBar
        product={product}
        handleAddToCart={() => handleAddToCart(false)}
        isAdding={isAdding}
      />

      {/* 🔥 LOGIN REQUIRED MODAL 🔥 */}
      {showLoginModal && <LoginPoup setShowLoginModal={setShowLoginModal} />}
    </div>
  );
};

// --- LOADING / ERROR STATES ---
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white flex flex-col justify-center items-center">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
  </div>
);

const ErrorState = ({ navigate }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-center">
    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
      <AlertCircle size={32} />
    </div>
    <h2 className="text-3xl font-bold mb-3 text-gray-900">Product Not Found</h2>
    <button
      onClick={() => navigate("/")}
      className="px-8 py-3.5 bg-black text-white rounded-full font-bold shadow-lg">
      Continue Shopping
    </button>
  </div>
);

export default ProductDetailsPage;
