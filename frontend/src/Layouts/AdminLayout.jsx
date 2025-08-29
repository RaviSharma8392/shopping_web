import { Sidebar } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/ui/navbar/Topbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">
          {/* Nested pages will render here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
