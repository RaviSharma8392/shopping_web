import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

/* ADMIN PAGES */
import Dashboard from "./pages/DashBoard";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import ProductCreatePage from "./pages/ProductCreatePages";

/* PROTECTED ADMIN */
import ProtectedAdmin from "./ProtectedAdmin";
import AdminCustomers from "./pages/AdminCustomersPage";
import AdminCategories from "./pages/AdminAllCategories";
import ProductsManagementPage from "./pages/ProductsManagementPage";
import AdminDashboard from "./pages/AdminDashboard";
import HomepageSetup from "./pages/HomepageSetup";
import TestimonialsAdminPage from "./pages/TestimonialsAdminPage";
import AdminCollectionPage from "./pages/AdminCollectionPage";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ✅ All admin pages share AdminLayout */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }>
        {/* ✅ Dashboard */}
        <Route index element={<AdminDashboard />} />
        {/* ✅ Category */}
        <Route path="categories/create" element={<CategoryCreatePage />} />
        <Route
          path="content/homepage/testimonials"
          element={<TestimonialsAdminPage />}
        />
        <Route path="content/homepage" element={<HomepageSetup />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="categories" element={<AdminCategories />} />
        {/* ✅ Product */}
        <Route path="products" element={<ProductsManagementPage />} />
        <Route path="products/create" element={<ProductCreatePage />} />
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
