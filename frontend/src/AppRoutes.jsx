import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./userApp/features/auth/context/UserContext";

/* --- LAYOUTS (Eager Load to prevent layout shift) --- */
import UserLayout from "./userApp/layouts/UserLayout";
import LoadingScreen from "./userApp/components/loading/LoadingScreen";
import AdminRoutes from "./admin/routes/AdminOrderRoutes";
import TaruvedaRoutes from "./userApp/routes/TaruvedaRoutes";
import AdminInquiryRoutes from "./admin/routes/adminInquiryRoutes";
import AdminLayoutRoutes from "./admin/routes/adminLayoutRoutes";
import AdminOrderRoutes from "./admin/routes/AdminOrderRoutes";

/* --- 1. LAZY LOAD: USER PAGES --- */
const HomePage = lazy(() => import("./userApp/pages/HomePage"));
const ContactUsPage = lazy(() => import("./userApp/pages/ContactUsPage"));
const ProductDetailsPage = lazy(
  () => import("./userApp/pages/ProductDetailsPage"),
);
const WishlistPage = lazy(
  () => import("./userApp/features/wishList/pages/WishlistPage"),
);
const OrdersPage = lazy(() => import("./userApp/pages//OrdersPage")); // User's Order History

/* --- 2. LAZY LOAD: SUB-ROUTERS --- */
const AuthRoutes = lazy(() => import("./userApp/routes/AuthRoutes"));
const AccountRoutes = lazy(() => import("./userApp/routes/AccountRoutes"));
const CheckoutRoutes = lazy(() => import("./userApp/routes/CheckoutRoutes"));

/* --- HELPER: FULL SCREEN LOADER --- */
const FullScreenLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
    <LoadingScreen />
  </div>
);

const AppRoutes = () => {
  const { isLoggedIn, user, loading } = useAuth();
  const location = useLocation();

  /* =========================================================
     🔒 PROTECTED ROUTE COMPONENT
     Handles Redirects & Role Checks
  ========================================================= */
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    // 1. Wait for Auth Check
    if (loading) return <FullScreenLoader />;

    // 2. Not Logged In? -> Go to Login
    if (!isLoggedIn) {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // 3. Admin Route but User is not Admin? -> Go Home
    if (adminOnly && user?.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    // 4. Access Granted
    return children ? children : <Outlet />;
  };

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* ====================================================
            1. PUBLIC AUTH ROUTES (Login, Register, Forgot PW)
            No Layout or Special Auth Layout
        ==================================================== */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/contact-us" element={<ContactUsPage />} />

        <Route
          path="/taruveda-organic-shampoo-oil*"
          element={<TaruvedaRoutes />}
        />

        {/* ====================================================
            2. USER STOREFRONT ROUTES
            Wrapped in UserLayout (Navbar + Footer)
        ==================================================== */}
        <Route element={<UserLayout />}>
          {/* Public Store Pages */}
          <Route index element={<HomePage />} />
          <Route path="product/:slug" element={<ProductDetailsPage />} />
          <Route path="wishlist" element={<WishlistPage />} />

          {/* Protected User Pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="orders" element={<OrdersPage />} />
            <Route path="user/*" element={<AccountRoutes />} />
            <Route path="checkout/*" element={<CheckoutRoutes />} />
          </Route>
        </Route>

        {/* ====================================================
            3. ADMIN DASHBOARD ROUTES
            Wrapped in AdminLayout (Sidebar + Admin Header)
            Protected: adminOnly={true}
        ==================================================== */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute adminOnly={true}></ProtectedRoute>}>
          {/* Main Admin Layout Section */}
          <Route path="*" element={<AdminLayoutRoutes />} />{" "}
          {/* Inquiry Section */}
          <Route path="customers/*" element={<AdminInquiryRoutes />} />
          <Route path="orders/*" element={<AdminOrderRoutes />} />
        </Route>

        {/* ====================================================
            4. FALLBACK (404)
        ==================================================== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
