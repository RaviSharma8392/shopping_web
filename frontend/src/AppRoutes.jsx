import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./userApp/features/auth/context/UserContext";

/* --- 1. CORE LAYOUTS (Eager Load for Speed) --- */
import UserLayout from "./userApp/layouts/UserLayout";
import LoadingScreen from "./userApp/components/loading/LoadingScreen";
import NotFoundPage from "./userApp/pages/NotFoundPage";
import NotificationPermissions from "./userApp/pages/NotificationPreferences";

/* --- 2. USER FEATURES (Lazy Loaded) --- */
const HomePage = lazy(() => import("./userApp/pages/HomePage"));
const ContactUsPage = lazy(() => import("./userApp/pages/ContactUsPage"));
const SettingsPage = lazy(() => import("./userApp/pages/SettingsPage"));
const CategoriesPage = lazy(
  () => import("./userApp/features/category/pages/CategoriesPage"),
);
const ProductDetailsPage = lazy(
  () => import("./userApp/pages/ProductDetailsPage"),
);
const WishlistPage = lazy(
  () => import("./userApp/features/wishList/pages/WishlistPage"),
);
const OrdersPage = lazy(() => import("./userApp/pages/OrdersPage"));

/* --- 3. SUB-ROUTERS --- */
const AuthRoutes = lazy(() => import("./userApp/routes/AuthRoutes"));
const AccountRoutes = lazy(() => import("./userApp/routes/AccountRoutes"));
const CheckoutRoutes = lazy(() => import("./userApp/routes/CheckoutRoutes"));
const TaruvedaRoutes = lazy(() => import("./userApp/routes/TaruvedaRoutes"));

/* --- 4. ADMIN FEATURES --- */
const AdminLayoutRoutes = lazy(
  () => import("./admin/routes/adminLayoutRoutes"),
);
const AdminInquiryRoutes = lazy(
  () => import("./admin/routes/adminInquiryRoutes"),
);
const AdminOrderRoutes = lazy(() => import("./admin/routes/AdminOrderRoutes"));

/* --- HELPER: FULL SCREEN LOADER --- */
const FullScreenLoader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
    <LoadingScreen />
  </div>
);

const AppRoutes = () => {
  const { isLoggedIn, user, loading } = useAuth();

  console.log({ user });
  const location = useLocation();

  // 🔒 PROTECTED ROUTE COMPONENT
  const ProtectedRoute = ({ adminOnly = false }) => {
    if (loading) return <FullScreenLoader />;

    // Not logged in
    if (!isLoggedIn || !user) {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Admin route check
    if (adminOnly) {
      if (user.role !== "admin") {
        return <Navigate to="/" replace />;
      }
    }

    return <Outlet />;
  };

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <Routes>
        {/* A. STANDALONE UTILITY PAGES (Amazon Style: No Navbar/Footer clutter) */}
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/notifications" element={<NotificationPermissions />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* B. MAIN STOREFRONT (Shopify Type: Navbar + Content + Footer) */}
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="product/:slug" element={<ProductDetailsPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route
            path="taruveda-organic-shampoo-oil/*"
            element={<TaruvedaRoutes />}
          />

          {/* C. PROTECTED USER FUNNEL (Checkout/History) */}
          <Route element={<ProtectedRoute />}>
            <Route path="orders" element={<OrdersPage />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="checkout/*" element={<CheckoutRoutes />} />
        </Route>
        {/* D. ACCOUNT MANAGEMENT (Full Page Layout) */}
        <Route element={<ProtectedRoute />}>
          <Route path="user/*" element={<AccountRoutes />} />
        </Route>

        {/* E. ADMIN ECOSYSTEM (Strict Protection) */}
        <Route path="/admin" element={<ProtectedRoute adminOnly={true} />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<AdminLayoutRoutes />} />
          <Route path="customers/*" element={<AdminInquiryRoutes />} />
          <Route path="orders/*" element={<AdminOrderRoutes />} />
        </Route>

        {/* F. 404 FALLBACK */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
