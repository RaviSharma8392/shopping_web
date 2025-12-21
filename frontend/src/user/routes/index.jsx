import { Routes, Route, Navigate } from "react-router-dom";

/* LAYOUTS */
import UserLayout from "../layouts/UserLayout";
import CheckoutLayout from "../layouts/CheckoutLayout";
import AccountLayout from "../layouts/AccountLayout";

/* USER PAGES */
import HomePage from "../pages/HomePage";
import CollectionPage from "../pages/CollectionsPage";
import CategoryDetails from "../pages/CategoryDetails";
import CartPage from "../pages/CartPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";

/* MISC */

import { useAuth } from "../context/AuthContext";
import AddressPage from "../pages/AddressPage";
import PaymentPage from "../pages/PaymentPage";
import ProfilePage from "../pages/ProfilePage";
import OrdersPage from "../pages/OrdersPage";
import WishlistPage from "../pages/WishlistPage";
import NotFoundPage from "../../shared/pages/NotFoundPage";

/* - PROTECTED ROUTE  */
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Navigate to="/account/login" replace />;
  return children;
};

const UserRoutes = ({ openSignupPopup }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
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
      {/*  CHECKOUT ROUTES  */}
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;
