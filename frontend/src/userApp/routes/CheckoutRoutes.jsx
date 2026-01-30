import React from "react";
import { Route, Routes } from "react-router-dom";
import CheckoutLayout from "../layouts/CheckoutLayout";
import CartPage from "../features/cart/pages/CartPage";
import AddressPage from "../pages/AddressPage";
import PaymentPage from "../pages/PaymentForOrder";

const CheckoutRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckoutLayout />}>
        <Route path="cart" element={<CartPage />} />
        <Route path="address" element={<AddressPage />} />
        <Route index element={<CartPage />} />
        <Route path="payment" element={<PaymentPage />} />
      </Route>
    </Routes>
  );
};

export default CheckoutRoutes;
