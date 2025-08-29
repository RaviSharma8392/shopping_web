// AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../Layouts/AdminLayout";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
import AdminCategoryPage from "../pages/Admin/AdminCategoryPage";
import AddItem from "../pages/Admin/AddItems";

const AdminRoutes = () => (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<AdminDashboard />} /> {/* /admin */}
    <Route path="users" element={<AdminUsersPage />} /> {/* /admin/users */}
    <Route path="categories" element={<AdminCategoryPage />} />{" "}
    {/* /admin/categories */}
    <Route path="items" element={<AddItem />} /> {/* /admin/items */}
  </Route>
);

export default AdminRoutes;
