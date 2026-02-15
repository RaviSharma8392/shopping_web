import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, MessageSquare, Users, Settings } from "lucide-react";

const AdminInquiryLayout = () => {
  return (
    <div className="h-screen bg-white flex font-sans text-gray-900 overflow-hidden">
      {/* --- SIDEBAR --- */}
      <aside className="w-20 lg:w-64 bg-gray-50 border-r border-gray-200 flex flex-col justify-between shrink-0 transition-all duration-300">
        <div>
          {/* Brand Logo */}
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-gray-100">
            <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="ml-3 font-bold text-lg hidden lg:block">
              Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-2 space-y-1 mt-4">
            <NavItem
              to="/admin"
              icon={<LayoutDashboard size={20} />}
              label="Overview"
            />
            <NavItem
              to="/admin/customers/messages"
              icon={<MessageSquare size={20} />}
              label="Inquiries"
            />
            <NavItem
              to="/admin/customers/lists"
              icon={<Users size={20} />}
              label="Customers"
            />
          </nav>
        </div>

        {/* Bottom Settings */}
        <div className="p-2 mb-4">
          <NavItem
            to="/admin/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      {/* <Outlet /> renders the child route (Messages, Overview, etc.) */}
      <main className="flex-1 flex overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
};

// Helper Component for Navigation Links
const NavItem = ({ icon, label, to }) => {
  const location = useLocation();
  // Check if this link is active. We check if pathname starts with the link
  // but handle the exact match for root "/admin" differently
  const isActive =
    to === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`
        flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-200 group
        ${
          isActive
            ? "bg-black text-white shadow-md"
            : "text-gray-500 hover:bg-gray-100 hover:text-black"
        }
      `}>
      <div
        className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-black"}`}>
        {icon}
      </div>
      <span className="text-sm font-medium hidden lg:block">{label}</span>
    </Link>
  );
};

export default AdminInquiryLayout;
