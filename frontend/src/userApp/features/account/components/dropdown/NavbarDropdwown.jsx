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
} from "lucide-react";
import { useAuth } from "../../../auth/context/UserContext";

const NavbarDropdown = ({ isOpen, onClose, menuItems = [] }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // 1. LOCK BODY SCROLL
  // Prevents the background website from scrolling when menu is open
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

  // Handle Logout
  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/");
  };

  // Handle Login Click
  const handleLoginClick = () => {
    onClose();
    navigate("/auth/login");
  };

  // 2. USE PORTAL
  // Renders this component at the end of the <body> tag,
  // ensuring it floats above EVERYTHING else.
  return createPortal(
    <div className={`fixed inset-0 z-[9999] pointer-events-none`}>
      {/* --- A. BACKDROP OVERLAY --- */}
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out pointer-events-auto
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* --- B. SIDEBAR DRAWER --- */}
      <aside
        className={`
          absolute top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl
          flex flex-col transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) pointer-events-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
        {/* 1. HEADER: PROFILE CARD */}
        <div className="bg-gray-900 text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <X size={24} />
          </button>

          <div className="flex items-center gap-4 mt-4 mb-1">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border-2 border-white/10 shadow-lg">
              {isLoggedIn && user?.name ? (
                <span className="text-xl font-bold tracking-wider">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User size={24} className="text-gray-400" />
              )}
            </div>

            {/* Info Text */}
            <div className="flex flex-col">
              {isLoggedIn ? (
                <>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Welcome Back
                  </span>
                  <span className="text-lg font-bold leading-tight truncate max-w-[160px]">
                    {user?.name?.split(" ")[0] || "User"}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-lg font-bold">Guest User</span>
                  <button
                    onClick={handleLoginClick}
                    className="text-xs font-bold text-gray-300 hover:text-white hover:underline underline-offset-4 mt-1 text-left transition-colors">
                    Login / Create Account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 2. BODY: SCROLLABLE MENU */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-200">
          {menuItems && menuItems.length > 0 ? (
            <ul className="divide-y divide-gray-50">
              {menuItems.map((item, index) => (
                <li key={item.path || index}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => `
                      group flex items-center justify-between px-6 py-4 text-[15px] font-medium transition-all duration-200
                      ${
                        isActive
                          ? "text-red-600 bg-red-50/60 border-l-4 border-red-600 pl-5"
                          : "text-gray-700 hover:bg-gray-50 hover:text-black border-l-4 border-transparent pl-5"
                      }
                    `}>
                    <span
                      className={
                        item.label === "New Arrivals"
                          ? "text-red-600 font-bold"
                          : ""
                      }>
                      {item.label}
                    </span>
                    <ChevronRight
                      size={18}
                      className="text-gray-300 group-hover:text-gray-500 transition-colors"
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 gap-3">
              <ShoppingBag size={32} strokeWidth={1.5} />
              <span className="text-sm">No items found</span>
            </div>
          )}
        </nav>

        {/* 3. FOOTER: ACTIONS */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 shrink-0 space-y-2">
          <button
            onClick={() => {
              onClose();
              navigate("/contact");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all">
            <HelpCircle size={18} /> Help Center
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/privacy-policy");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all">
            <ShieldCheck size={18} /> Privacy Policy
          </button>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors mt-2">
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                navigate("/settings");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-white hover:text-black hover:shadow-sm rounded-lg transition-all">
              <Settings size={18} /> Settings
            </button>
          )}
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default NavbarDropdown;
