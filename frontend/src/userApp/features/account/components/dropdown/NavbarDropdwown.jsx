import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import {
  X,
  ChevronRight,
  User,
  LogOut,
  Settings,
  HelpCircle,
  ShieldCheck,
  ShoppingBag,
  Home,
  Star,
  Package,
} from "lucide-react";
import { useAuth } from "../../../auth/context/UserContext";

const NavbarDropdown = ({ isOpen, onClose, menuItems = [] }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/");
  };

  const BRAND_RED = "#B4292F"; // Your Mnmukt/Taruveda brand color

  return createPortal(
    <div
      className={`fixed inset-0 z-[10000] ${isOpen ? "visible" : "invisible"}`}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`absolute top-0 left-0 h-full w-[85%] max-w-[340px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        {/* 1. CLEAN HEADER (Amazon Type) */}
        <div className="bg-white border-b border-gray-100 p-5 pt-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full">
            <X size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200">
              {isLoggedIn ? (
                <span className="text-lg font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={24} />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Hello,</p>
              {isLoggedIn ? (
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  {user?.name?.split(" ")[0]}
                </p>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    navigate("/auth/login");
                  }}
                  className="text-lg font-bold text-gray-900 flex items-center gap-1">
                  Sign In{" "}
                  <ChevronRight size={16} style={{ color: BRAND_RED }} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. MENU CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {/* Quick Links Section */}
          <div className="py-4">
            <h3 className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Shop Categories
            </h3>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      flex items-center justify-between px-6 py-3.5 text-[15px] transition-all
                      ${isActive ? "bg-red-50 text-red-700 font-bold" : "text-gray-700 active:bg-gray-100"}
                    `}>
                    {item.label}
                    <ChevronRight size={16} className="text-gray-300" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-[1px] bg-gray-100 mx-6 my-2" />

          {/* Account Section */}
          <div className="py-4">
            <h3 className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Your Account
            </h3>
            <ul className="space-y-1 text-gray-700">
              <li>
                <button
                  onClick={() => {
                    onClose();
                    navigate("/user/profile");
                  }}
                  className="w-full flex items-center gap-4 px-6 py-3 text-[15px] active:bg-gray-100">
                  <Package size={20} className="text-gray-400" /> My Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onClose();
                    navigate("/wishlist");
                  }}
                  className="w-full flex items-center gap-4 px-6 py-3 text-[15px] active:bg-gray-100">
                  <Star size={20} className="text-gray-400" /> Wishlist
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. UTILITY FOOTER */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-black">
              <HelpCircle size={20} />
              <span className="text-[10px] font-bold uppercase">Help</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-black">
              <Settings size={20} />
              <span className="text-[10px] font-bold uppercase">Settings</span>
            </button>
          </div>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="w-full py-3 text-sm font-bold text-center border border-gray-200 rounded-lg bg-white text-gray-700 active:bg-gray-100 transition-colors">
              Sign Out
            </button>
          )}

          <p className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
            © 2026 MNMUKT | TARUVEDA
          </p>
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default NavbarDropdown;
