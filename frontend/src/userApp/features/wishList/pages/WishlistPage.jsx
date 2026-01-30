import { useEffect, useState, useCallback } from "react";
import { useProducts } from "../../product/hook/useProducts";
import { useWishlist } from "../hook/useWishlist";
import Notification from "../../../../shared/components/Notification";
import EmptyWishlist from "./EmptyWishlist";
import MoveToCartPopUp from "../components/pop-up/MoveToCartPopUp";
import { WishlistCard } from "../components/cards/WishlistCard";

const WishlistPage = () => {
  const { wishlist, loading: wishlistLoading } = useWishlist();
  const { getProductById } = useProducts();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  /** Notification helper */
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 2000);
  };

  /** Fetch wishlist products */
  const fetchAllProducts = useCallback(async () => {
    if (!wishlist || wishlist.length === 0) {
      setProducts([]);
      setLoadingProducts(false);
      return;
    }

    setLoadingProducts(true);
    try {
      const requests = wishlist.map((item) => getProductById(item.productId));
      const results = await Promise.all(requests);
      setProducts(results.filter(Boolean));
    } finally {
      setLoadingProducts(false);
    }
  }, [wishlist, getProductById]);

  /** Run when wishlist changes */
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  /** Page Loading */
  if (wishlistLoading || loadingProducts) {
    return (
      <div className="w-full h-40 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-1 md:px-4 py-3 md:py-5">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
          duration={2000}
        />
      )}

      {/* Empty Wishlist */}
      {products.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <h2 className="ml-3 text-[20px] font-[crimsonPro] uppercase mb-6">
            My Wishlist
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
            {products.map((product) => (
              <WishlistCard
                key={product.id}
                product={product}
                showNotification={showNotification}
                onMoveToCart={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </>
      )}

      {/* Move To Cart Popup */}
      {selectedProduct && (
        <MoveToCartPopUp
          open={true}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onCompleted={() => {
            showNotification("Added to cart!", "success");
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default WishlistPage;
