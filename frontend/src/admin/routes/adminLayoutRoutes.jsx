import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import AdminLayout from "../layouts/AdminLayout";

const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const CategoryCreatePage = lazy(() => import("../pages/CategoryCreatePage"));
const ProductCreatePage = lazy(() => import("../pages/ProductCreatePages"));
const AdminCategories = lazy(() => import("../pages/AdminAllCategories"));
const ProductsManagementPage = lazy(
  () => import("../pages/ProductsManagementPage"),
);
const HomepageSetup = lazy(() => import("../pages/HomepageSetup"));
const TestimonialsAdminPage = lazy(
  () => import("../pages/TestimonialsAdminPage"),
);
const AdminCollectionPage = lazy(() => import("../pages/AdminCollectionPage"));
const AdminOrdersPage = lazy(() => import("../pages/AdminOrderDetailsPage"));
const AdminSignupPage = lazy(() => import("../pages/AdminSignUpPage"));
const TaruvedaAdminCreateProduct = lazy(
  () => import("../pages/TaruvedaAdminCreateProduct"),
);

const AdminLayoutRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="categories/create" element={<CategoryCreatePage />} />
        <Route path="products" element={<ProductsManagementPage />} />
        <Route path="products/create" element={<ProductCreatePage />} />
        <Route path="products/edit/:id" element={<ProductCreatePage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="content/homepage" element={<HomepageSetup />} />
        <Route
          path="content/homepage/testimonials"
          element={<TestimonialsAdminPage />}
        />
        <Route path="testimonial" element={<TestimonialsAdminPage />} />
        <Route path="collection" element={<AdminCollectionPage />} />
        <Route
          path="taruveda/create"
          element={<TaruvedaAdminCreateProduct />}
        />
        <Route path="login" element={<AdminSignupPage />} />
      </Route>
    </Routes>
  );
};

export default AdminLayoutRoutes;
