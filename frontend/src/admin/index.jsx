import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

/* ADMIN PAGES */
import Dashboard from "./pages/DashBoard";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import ProductCreatePage from "./pages/ProductCreatePages";

/* PROTECTED ADMIN */
import AdminCustomers from "./pages/AdminCustomersPage";
import AdminCategories from "./pages/AdminAllCategories";
import ProductsManagementPage from "./pages/ProductsManagementPage";
import AdminDashboard from "./pages/AdminDashboard";
import HomepageSetup from "./pages/HomepageSetup";
import TestimonialsAdminPage from "./pages/TestimonialsAdminPage";
import AdminCollectionPage from "./pages/AdminCollectionPage";
import AdminOrdersPage from "./pages/AdminOrderDetailsPage";
import AdminSignupPage from "./pages/AdminSignUpPage";
import TaruvedaAdminCreateProduct from "./pages/TaruvedaAdminCreateProduct";
import AdminMessages from "./pages/AdminMessages";
import AdminInquiryLayout from "./layouts/AdminInquiryLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ✅ All admin pages share AdminLayout */}
      <Route path="message" element={<AdminMessages />} />{" "}
      <Route path="" element={<AdminInquiryLayout />}>
        {/* Default /admin loads Overview */}
        <Route index element={<AdminOverview />} />

        {/* /admin/messages loads Messages */}
        <Route path="messages" element={<AdminMessages />} />

        {/* /admin/customers loads Customers */}
        <Route path="customers" element={<AdminCustomers />} />

        {/* Add more admin pages here */}
      </Route>
      <Route path="" element={<AdminLayout />}>
        {/* ✅ Dashboard */}
        <Route index element={<AdminDashboard />} />
        {/* ✅ Category */}
        <Route path="categories/create" element={<CategoryCreatePage />} />
        <Route
          path="content/homepage/testimonials"
          element={<TestimonialsAdminPage />}
        />
        <Route path="content/homepage" element={<HomepageSetup />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="login" element={<AdminSignupPage />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="categories" element={<AdminCategories />} />
        {/* ✅ Product */}
        <Route path="products" element={<ProductsManagementPage />} />
        <Route path="products/create" element={<ProductCreatePage />} />
        <Route
          path="taruveda/create"
          element={<TaruvedaAdminCreateProduct />}
        />
        <Route path="products/edit/:id" element={<ProductCreatePage />} />
        <Route path="testimonial" element={<TestimonialsAdminPage />} />{" "}
        <Route path="collection" element={<AdminCollectionPage />} />
      </Route>
      {/* ✅ Fallback in case someone hits something wrong */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AdminRoutes;
