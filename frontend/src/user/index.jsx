import { Routes, Route, Navigate } from "react-router-dom";

/* LAYOUTS */
import UserLayout from "../user/layouts/UserLayout";
import AccountLayout from "./layouts/AccountLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";

/* USER PAGES */
import HomePage from "../user/pages/HomePage";
import CollectionPage from "../user/pages/CollectionsPage";
import CategoryDetails from "../user/pages/CategoryDetails";
import WishlistPage from "../user/pages/WishlistPage";
import CartPage from "../user/pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

/* ACCOUNT PAGES */
import ProfilePage from "../user/pages/ProfilePage";
import OrdersPage from "../user/pages/OrdersPage";

/* AUTH PAGES */
import SignupPage from "../user/pages/SignupPage";
import LoginPage from "../user/pages/LoginPage";

/* MISC */
import NotFoundPage from "../shared/pages/NotFoundPage";
import EmailVerification from "../user/pages/EmailVerificationNotice";
import ConnectionErrorPage from "./pages/ConnectionErrorPage";

import { useAuth } from "./context/AuthContext";

/* - PROTECTED ROUTE  */
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/account/login" replace />;
  return children;
};

const UserRoutes = ({ openSignupPopup }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/*  PUBLIC AUTH ROUTES  */}
      <Route path="/connection-error" element={<ConnectionErrorPage />} />
      <Route path="/account/login" element={<LoginPage />} />
      <Route path="/account/register" element={<SignupPage />} />
      <Route
        path="/account/email-verification"
        element={<EmailVerification />}
      />

      {/*  PUBLIC SITE PAGES  */}
      <Route
        path="/"
        element={<UserLayout openSignupPopup={openSignupPopup} />}>
        <Route index element={<HomePage />} />
        <Route path="collections" element={<CollectionPage />} />
        <Route path="collections/:slug" element={<CategoryDetails />} />
        <Route path="product/:slug" element={<ProductDetailsPage />} />
      </Route>

      {/*  ACCOUNT PAGES (PROTECTED)  */}
      <Route
        path="/account"
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

      {/*  CHECKOUT ROUTES  */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CheckoutLayout />
          </ProtectedRoute>
        }>
        <Route path="cart" element={<CartPage />} />
        <Route index element={<CartPage />} />
      </Route>

      {/*FALLBACK*/}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;
