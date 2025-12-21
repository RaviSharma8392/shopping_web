import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaStar,
  FaEnvelope,
  FaBox,
  FaUsers,
  FaShoppingBag,
  FaTags,
  FaChartBar,
  FaCog,
  FaUserCog,
  FaFileInvoice,
  FaTruck,
  FaComments,
  FaImages,
  FaSlidersH,
  FaBell,
} from "react-icons/fa";

import { COLORS } from "../../../style/theme";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const adminModules = [
    {
      title: "Dashboard",
      path: "/admin",
      icon: <FaChartBar />,
      description: "Overview & Analytics",
    },
    {
      title: "Products",
      path: "/admin/products",
      icon: <FaShoppingBag />,
      submenu: [
        { name: "All Products", path: "/admin/products" },
        { name: "Add Product", path: "/admin/products/create" },
        { name: "Inventory", path: "/admin/products/inventory" },
        { name: "Product Reviews", path: "/admin/products/reviews" },
      ],
    },
    {
      title: "Categories",
      path: "/admin/categories",
      icon: <FaTags />,
      submenu: [
        { name: "All Categories", path: "/admin/categories" },
        { name: "Add Category", path: "/admin/categories/create" },
        { name: "Manage Collection", path: "/admin/Collection" },
      ],
    },
    {
      title: "Orders",
      path: "/admin/orders",
      icon: <FaFileInvoice />,
      submenu: [
        { name: "All Orders", path: "/admin/orders" },
        { name: "Pending Orders", path: "/admin/orders/pending" },
        { name: "Completed Orders", path: "/admin/orders/completed" },
        { name: "Returns", path: "/admin/orders/returns" },
      ],
    },
    {
      title: "Customers",
      path: "/admin/customers",
      icon: <FaUsers />,
      submenu: [
        { name: "All Customers", path: "/admin/customers" },
        { name: "Customer Groups", path: "/admin/customers/groups" },
        { name: "Messages", path: "/admin/customers/messages" },
      ],
    },
    {
      title: "Content",
      path: "/admin",
      icon: <FaImages />,
      submenu: [
        { name: "Testimonial", path: "/admin/testimonial" },
        { name: "Blog Posts", path: "/admin/content/blog" },
        { name: "Homepage Setup", path: "/admin/content/homepage" },
      ],
    },
    {
      title: "Shipping",
      path: "/admin/shipping",
      icon: <FaTruck />,
      submenu: [
        { name: "Shipping Zones", path: "/admin/shipping/zones" },
        { name: "Coupons", path: "/admin/shipping/coupons" },
        { name: "Delivery Partners", path: "/admin/shipping/partners" },
      ],
    },
    {
      title: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
      submenu: [
        { name: "General Settings", path: "/admin/settings/general" },
        { name: "Payment Methods", path: "/admin/settings/payments" },
        { name: "Tax Settings", path: "/admin/settings/tax" },
        { name: "Notifications", path: "/admin/settings/notifications" },
      ],
    },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    // Firebase logout logic here
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isActivePath = (path) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  return (
    <nav className="fixed top-0 py-5 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo & Desktop Navigation */}
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#B4292F] to-[#8f1f23] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  MNMUKT Admin
                </h1>
                <p className="text-xs text-gray-500">Management Panel</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 ml-8">
              {adminModules.map((module) => (
                <div key={module.path} className="relative group">
                  <Link
                    to={module.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActivePath(module.path)
                        ? "bg-[#B4292F] text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B4292F]"
                    }`}>
                    <span className="text-sm">{module.icon}</span>
                    <span>{module.title}</span>
                  </Link>

                  {/* Dropdown Submenu */}
                  {module.submenu && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {module.submenu.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-3 text-sm transition-colors ${
                              location.pathname === item.path
                                ? "bg-red-50 text-[#B4292F] font-medium"
                                : "text-gray-700 hover:bg-gray-50 hover:text-[#B4292F]"
                            }`}>
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - User Menu & Notifications */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-[#B4292F] hover:bg-gray-100 rounded-lg transition-colors">
              <FaBell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-[#B4292F] to-[#8f1f23] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500">admin@biba.com</p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/admin/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B4292F] transition-colors">
                      <FaUserCog className="w-4 h-4 mr-3" />
                      Profile Settings
                    </Link>
                    <Link
                      to="/admin/notifications"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#B4292F] transition-colors">
                      <FaBell className="w-4 h-4 mr-3" />
                      Notifications
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <FaSignOutAlt className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-[#B4292F] hover:bg-gray-100 rounded-lg transition-colors">
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaBars className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="py-2 space-y-1">
              {adminModules.map((module) => (
                <div key={module.path}>
                  <Link
                    to={module.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                      isActivePath(module.path)
                        ? "bg-[#B4292F] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B4292F]"
                    }`}>
                    <span className="text-sm">{module.icon}</span>
                    <span>{module.title}</span>
                  </Link>

                  {/* Mobile Submenu */}
                  {module.submenu && (
                    <div className="ml-8 bg-gray-50 rounded-lg my-1">
                      {module.submenu.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center px-4 py-2 text-xs transition-colors ${
                            location.pathname === item.path
                              ? "text-[#B4292F] font-medium bg-red-50"
                              : "text-gray-600 hover:text-[#B4292F] hover:bg-white"
                          }`}>
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200">
                <FaSignOutAlt className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
