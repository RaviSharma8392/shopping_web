import React from "react";
import { Route } from "react-router-dom";
import ViewItems from "../pages/User/ViewItems";
import ItemDetails from "../pages/User/ItemDetails";
import CartPage from "../pages/Cart/CartPage";
import AddItem from "../pages/Admin/AddItems";
import EnquiryForm from "../pages/User/EnquiryForm";
import UserLayout from "../Layouts/UserLayout";
import CheckoutPage from "../pages/User/CheckoutPage";
import CategoryPage from "../pages/User/CategoryPage";
import HomePage from "../pages/HomePage";
const user = JSON.parse(localStorage.getItem("user"));

const UserRoutes = () =>
  user ? (
    <Route path="/" element={<UserLayout />}>
      <Route index element={<ViewItems />} />
      <Route
        path="item/:id/:name/:category/:subcategory"
        element={<ItemDetails />}
      />
      <Route path="cart" element={<CartPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="additem" element={<AddItem />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />

      <Route path=":id/:name/:type/enquiry" element={<EnquiryForm />} />
    </Route>
  ) : (
    <Route path="/" element={<HomePage />} />
  );

export default UserRoutes;
