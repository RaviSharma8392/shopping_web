import React, { useEffect, useState } from "react";
import Notification from "../../shared/components/Notification";
import { useWishlist } from "../hook/useWishlist";
import { useProducts } from "../hook/useProducts";
import EmptyWishlist from "./EmptyWishlist";
import { WishlistCard } from "../code/cards/WishlistCard";
import MoveToCartPopUp from "../code/pop-up/MoveToCartPopUp";

const WishlistPage = () => {
  const { wishlist, loading: wishlistLoading, reload } = useWishlist();
  const { getProduct } = useProducts();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showNotification = (msg, type = "info") => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 2000);
  };

  /**  Fetch all wishlist products */
  useEffect(() => {
    if (!wishlist || wishlist.length === 0) {
      setProducts([]);
      setLoadingProducts(false);
      return;
    }
    fetchAllProducts();
  }, [wishlist]);

  const fetchAllProducts = async () => {
    try {
      setLoadingProducts(true);
      const req = wishlist.map((item) => getProduct(item.productId));
      const results = await Promise.all(req);
      setProducts(results.filter(Boolean));
    } finally {
      setLoadingProducts(false);
    }
  };

  /**  Page Loading State */
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
                reloadWishlist={reload}
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
