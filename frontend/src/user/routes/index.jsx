import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

/* LAYOUTS */
import UserLayout from "../layouts/UserLayout";
import CheckoutLayout from "../layouts/CheckoutLayout";
import AccountLayout from "../layouts/AccountLayout";
import TaruvedaLayout from "../layouts/TaruvedaLayout";

/* USER PAGES - Lazy Loaded */
const HomePage = lazy(() => import("../pages/HomePage"));
const CollectionPage = lazy(() => import("../pages/CollectionsPage"));
const CategoryDetails = lazy(() => import("../pages/CategoryDetails"));
const CartPage = lazy(() => import("../pages/CartPage"));
const ProductDetailsPage = lazy(() => import("../pages/ProductDetailsPage"));

/* TARUVEDA PAGES - Lazy Loaded */
const TaruvedaProductPage = lazy(
  () => import("../../userApp/features/taruveda/pages/TaruvedaProductPage"),
);
const TaruVedaCartPage = lazy(
  () => import("../../userApp/features/taruveda/pages/TaruVedaCartPage"),
);

/* ACCOUNT PAGES - Lazy Loaded */
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const OrdersPage = lazy(() => import("../pages/OrdersPage"));
const WishlistPage = lazy(() => import("../pages/WishlistPage"));

/* CHECKOUT PAGES - Lazy Loaded */
const AddressPage = lazy(() => import("../pages/AddressPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));

/* MISC */
const NotFoundPage = lazy(() => import("../../shared/pages/NotFoundPage"));
import { useAuth } from "../../userApp/context/AuthContext";
import TaruVedaCheckoutPage from "../../userApp/features/taruveda/pages/TaruVedaCheckoutPage";

/* - PROTECTED ROUTE  */
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/account/login" replace />;
  return children;
};

const UserRoutes = ({ openSignupPopup }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* ================= PUBLIC SITE PAGES ================= */}
        <Route
          path="/"
          element={<UserLayout openSignupPopup={openSignupPopup} />}>
          <Route index element={<HomePage />} />
          <Route path="collections" element={<CollectionPage />} />
          <Route path="collections/:slug" element={<CategoryDetails />} />
          <Route path="product/:slug" element={<ProductDetailsPage />} />
        </Route>

        {/* ================= TARUVEDA PRODUCT PAGES ================= */}
        <Route
          path="/taruveda-organic-shampoo-oil"
          element={<TaruvedaLayout />}>
          <Route index element={<TaruvedaProductPage />} />
          <Route path="cart" element={<TaruVedaCartPage />} />
          <Route path="Checkout" element={<TaruVedaCheckoutPage />} />
        </Route>

        {/* ================= ACCOUNT PAGES (PROTECTED) ================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AccountLayout />
            </ProtectedRoute>
          }>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route index element={<ProfilePage />} />
        </Route>

        {/* ================= CHECKOUT ROUTES (PROTECTED) ================= */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CheckoutLayout />
            </ProtectedRoute>
          }>
          <Route path="cart" element={<CartPage />} />
          <Route path="address" element={<AddressPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route index element={<CartPage />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default UserRoutes;
