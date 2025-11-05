import React from "react";
import { Outlet } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AdminNavbar from "../components/common/bars/AdminNavbar";

const AdminLayout = ({
  title = "Admin Panel",
  description = "Manage properties, users and inquiries",
}) => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Helmet>
          <title>{title} | Arjun BuildTech</title>
          <meta name="description" content={description} />
          <meta name="robots" content="noindex, nofollow" />{" "}
          {/* Admin pages usually shouldn't be indexed */}
        </Helmet>

        {/* Navbar */}
        <AdminNavbar />

        {/* Main content */}
        <main className="flex-1 pt-20 px-6 lg:px-10">
          <Outlet />
        </main>
      </div>
    </HelmetProvider>
  );
};

export default AdminLayout;
