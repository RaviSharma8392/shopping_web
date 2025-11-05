import { Routes, Route } from "react-router-dom";

/* ----------------- LAYOUTS ----------------- */
import UserLayout from "../user/layouts/UserLayout";

/* ----------------- USER PAGES ----------------- */
// import ItemDetails from "../pages/User/ItemDetails";
// import CartPage from "../pages/Cart/CartPage";
// import CheckoutPage from "../pages/User/CheckoutPage";
// import CategoryPage from "../pages/User/CategoryPage";
// import EnquiryForm from "../pages/User/EnquiryForm";
// import AccountPage from "../pages/User/Account";

/* ----------------- AUTH PAGES ----------------- */
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
// import AboutUs from "../pages/User/AboutUs";
// import EmailVerificationNotice from "../user/pages/EmailVerificationNotice";
import NotFoundPage from "../shared/pages/NotFoundPage";
import HomePage from "../user/pages/HomePage";
import AccountPage from "./pages/AccountPage";
import CollectionPage from "./pages/CollectionsPage";
import CategoryDetails from "./pages/CategoryDetails";
// import WishlistPage from "../user/pages/WishlistPage";

/* ----------------- CHECK LOGIN ----------------- */
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
// const isAdmin = user?.role === "admin";

const UserRoutes = () => {
  return (
    <Routes>
      {/* ✅ PUBLIC AUTH ROUTES */}
      {/* <Route
        path="/account/email-verification"
        element={<EmailVerificationNotice />}
      /> */}

      <Route path="account/login" element={<LoginPage />} />
      <Route path="account/register" element={<SignupPage />} />
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="collections" element={<CollectionPage />} />
        <Route path="/collections/:slug" element={<CategoryDetails />} />
      </Route>
      <Route path="/account" element={<AccountPage />} />

      {/*  USER ROUTES (only if logged in) */}
      {/* {user && (
        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="item/:id/:name/:category/:subcategory"
            element={<ItemDetails />}
          />

          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="additem" element={<AddItem />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path=":id/:name/:type/enquiry" element={<EnquiryForm />} />
          <Route path="about" element={<AboutUs />} />
        </Route>
      )} */}

      {/*  IF USER NOT LOGGED IN → HOME PAGE */}

      {/* ✅ SHARED ROUTES */}
      {/* <Route path="/account" element={<AccountPage />} /> */}

      {/* ✅ FALLBACK */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;
