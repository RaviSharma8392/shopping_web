import React from "react";
import { NavLink } from "react-router-dom";
import { User, X } from "lucide-react";

const NavbarDropdown = ({ isOpen, onClose, menuItems }) => {
  const COLORS = {
    primary: "#D63384",
    secondary: "#F8C8DC",
    accent: "#FFF0F5",
    text: "#2C1A27",
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-all duration-300 z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          navbar-dropdown
          fixed top-0 left-0 h-full z-50 shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "#ffffff",
          color: COLORS.text,
          width: "88%",
          maxWidth: "420px",
        }}>
        {/* Responsive Width */}
        <style>{`
          @media (min-width: 768px) {
            .navbar-dropdown {
              width: 40% !important;
              max-width: 380px !important;
            }
          }
        `}</style>

        {/* Header */}

        <div className="p-4 flex justify-end">
          <button className="hover:opacity-70" onClick={onClose}>
            <X size={26} strokeWidth={1.7} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col px-6 pb-20 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `py-4 text-lg font-[Amiri] border-b border-gray-300 transition-all
                ${
                  isActive
                    ? "font-semibold text-[#D63384]"
                    : "text-gray-800 hover:text-pink-600"
                }`
              }>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer – Only Account */}
        <div
          className="p-5 border-t  border-gray-300 flex items-center gap-3 cursor-pointer"
          onClick={() => {
            onClose();
            window.location.href = "/account";
          }}>
          <User size={24} strokeWidth={1.8} className="text-gray-800" />
          <span className="text-md font-medium text-gray-800">Account</span>
        </div>
      </aside>
    </>
  );
};

export default NavbarDropdown;
