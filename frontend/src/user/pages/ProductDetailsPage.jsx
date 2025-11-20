import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Star,
  Check,
  ShoppingBag,
  RotateCcw,
  ZoomIn,
} from "lucide-react";
import { useProducts } from "../hook/useProducts";
import { useWishlist } from "../hook/useWishlist";
import Notification from "../../shared/components/Notification";
import ProductImageGallery from "../code/product/ProductImageGallery";
import SizeSelector from "../code/product/SizeSelector";
import ColorSelector from "../code/product/ColorSelector";
import ProductAccordion from "../code/product/ProductAccordion";
import RelatedProducts from "../code/product/RelatedProducts";
import NavigationBar from "../code/navigationBar/NavigationBar";
import ProductBottomBar from "../code/bars/ProductBottomBar";
import ProductInfo from "../code/product/ProductInfo";

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug, loading, error } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const { isLiked, addToWishlist, removeFromWishlist } = useWishlist(
    product?.id
  );

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const productData = await getProductBySlug(slug);
      setProduct(productData);
      // Set default selections
      if (productData?.sizes?.length > 0) {
        setSelectedSize(productData.sizes[0]);
      }
      if (productData?.colors?.length > 0) {
        setSelectedColor(productData.colors[0]);
      }
    } catch (err) {
      console.error("Error loading product:", err);
    }
  };

  const showNotification = (type, message, duration = 5000) => {
    setNotification({ type, message, duration });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const handleWishlistToggle = () => {
    if (isLiked) {
      removeFromWishlist();
      showNotification("success", "Removed from wishlist");
    } else {
      addToWishlist(product);
      showNotification("success", "Added to wishlist");
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // add to cart context logic here
      showNotification("success", "Product added to cart!");
    } catch (err) {
      console.error(err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    // Buy now logic here
    showNotification("success", "Proceeding to checkout!");
  };

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const calculateDiscount = () => {
    if (
      product?.originalPrice &&
      product?.price &&
      product.originalPrice > product.price
    ) {
      const discount =
        ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B4292F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-[#B4292F] text-white rounded-lg font-semibold hover:bg-[#9c2227] transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const discount = calculateDiscount();

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-8">
        {/* Breadcrumb & Navigation */}
        <NavigationBar product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-15">
          {/* Product Images */}
          <div className="">
            <ProductImageGallery
              images={product.images}
              activeIndex={activeImageIndex}
              onImageChange={setActiveImageIndex}
              productName={product.name}
            />
          </div>

          {/* Product Details */}
          <ProductInfo
            product={product}
            discount={discount}
            renderStars={renderStars}
            formatPrice={formatPrice}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
            handleWishlistToggle={handleWishlistToggle}
            isLiked={isLiked}
            isAdding={isAdding}
            isActive={product.isActive}
          />
        </div>

        {/* Product Details Accordion */}
        <div className="mt-16 max-w-4xl mx-auto">
          <ProductAccordion product={product} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts
            currentProductId={product.id}
            categoryId={product.categoryId}
            collectionType={product.collectionType}
          />
        </div>
      </div>

      {/* Notification Panel */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          duration={notification.duration}
          onClose={hideNotification}
        />
      )}
      <ProductBottomBar
        product={product}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        qty={quantity}
        isAdding={isAdding}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductDetailsPage;
