import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

/* ADMIN PAGES */
import Dashboard from "./pages/DashBoard";
import CategoryCreatePage from "./pages/CategoryCreatePage";
import ProductCreatePage from "./pages/ProductCreatePage";

/* PROTECTED ADMIN */
import ProtectedAdmin from "./ProtectedAdmin";

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
        <Route index element={<Dashboard />} />

        {/* ✅ Category */}
        <Route path="categories/create" element={<CategoryCreatePage />} />

        {/* ✅ Product */}
        <Route path="products/create" element={<ProductCreatePage />} />
      </Route>

      {/* ✅ Fallback in case someone hits something wrong */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
};

export default AdminRoutes;
