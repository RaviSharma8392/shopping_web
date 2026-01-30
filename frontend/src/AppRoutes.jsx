import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./userApp/features/auth/context/UserContext";

/* LAYOUTS */
import UserLayout from "./userApp/layouts/UserLayout";
// import AdminLayout from "./admin/layouts/AdminLayout";

/* PAGES */
import HomePage from "./userApp/pages/HomePage";
import ProductDetailsPage from "./userApp/pages/ProductDetailsPage";

/* ROUTES */
import AuthRoutes from "./userApp/routes/AuthRoutes";
import TaruvedaRoutes from "./userApp/routes/TaruvedaRoutes";
import AccountRoutes from "./userApp/routes/AccountRoutes";
import CheckoutRoutes from "./userApp/routes/CheckoutRoutes";
// import AdminRoutes from "./admin/routes/AdminRoutes";

/* --- 1. PROFESSIONAL LOADING COMPONENT --- */
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-12 h-12 border-4 border-gray-100 rounded-full"></div>
        {/* Inner Spinning Ring (The smooth part) */}
        <div className="absolute w-12 h-12 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <p className="mt-4 text-xs font-medium text-gray-400 uppercase tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
};

const AppRoutes = () => {
  const { isLoggedIn, user, loading } = useAuth();

  // --- 2. USE THE NEW LOADER ---
  if (loading) return <LoadingScreen />;

  /* ================= ROLE-BASED PROTECTED ROUTES ================= */
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isLoggedIn) return <Navigate to="/auth/login" replace />;
    if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetailsPage />} />
      </Route>

      <Route
        path="/taruveda-organic-shampoo-oil/*"
        element={<TaruvedaRoutes />}
      />

      {/* USER ROUTES */}
      <Route
        path="/user/*"
        element={
          <ProtectedRoute>
            <AccountRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout/*"
        element={
          <ProtectedRoute>
            <CheckoutRoutes />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES (Commented out as per your code)
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly={true}>
             <AdminLayout>
               <AdminRoutes />
             </AdminLayout>
          </ProtectedRoute>
        }
      /> */}

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
