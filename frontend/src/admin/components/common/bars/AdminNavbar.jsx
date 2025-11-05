import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaStar,
  FaEnvelope,
  FaBuilding,
  FaBox,
} from "react-icons/fa";

import { COLORS } from "../../../../style/theme";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Dashboard", path: "/admin", icon: <FaBox /> },
    { name: "Products", path: "/admin/products/create", icon: <FaBuilding /> },
    {
      name: "Categories",
      path: "/admin/categories/create",
      icon: <FaBuilding />,
    },
    { name: "Reviews", path: "/admin/reviews", icon: <FaStar /> },
    { name: "Orders", path: "/admin/orders", icon: <FaEnvelope /> },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    // Firebase logout here
    alert("Logged out");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-md transition-all"
      style={{
        backgroundColor: COLORS.accentAlt,
        color: COLORS.textAlt,
      }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center py-4">
          {/* ✅ Logo */}
          <Link to="/admin" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Admin Logo"
              className="w-10 h-10 object-contain rounded-md"
            />
            <span className="text-lg font-semibold tracking-wide">
              Admin Panel
            </span>
          </Link>

          {/* ✅ Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === link.path
                    ? `bg-white ${COLORS.textAlt}`
                    : "text-white/90 hover:bg-white/20"
                }`}>
                {link.icon}
                {link.name}
              </Link>
            ))}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 py-2 px-4 rounded-md text-white hover:bg-red-700 transition">
              <FaSignOutAlt />
              Logout
            </button>
          </div>

          {/* ✅ Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md bg-white/20 hover:bg-white/30 transition">
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 flex flex-col gap-2 bg-white/10 rounded-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md ${
                  location.pathname === link.path
                    ? "bg-white text-gray-900"
                    : "text-white hover:bg-white/20"
                }`}>
                {link.icon}
                {link.name}
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-300 hover:text-red-200">
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
