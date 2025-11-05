import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const NavbarDropdown = ({ isOpen, onClose, menuItems }) => {
  const COLORS = {
    primary: "#D63384",
    secondary: "#F8C8DC",
    accent: "#FFF0F5",
    text: "#2C1A27",
  };

  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 shadow-xl
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "#fff",
          color: COLORS.text,
          width: "80%",
          maxWidth: "340px",
        }}>
        {/* Responsive width */}
        <style>
          {`
            @media(min-width: 768px){
              aside {
                width: 45% !important;
                max-width: 420px !important;
              }
            }
          `}
        </style>

        {/* Header */}
        <div
          className="flex items-center justify-between px-5 h-16 border-b"
          style={{ borderColor: COLORS.secondary }}>
          <h2
            className="text-xl font-semibold"
            style={{ color: COLORS.primary }}>
            Menu
          </h2>

          <button className="p-2 hover:opacity-70" onClick={onClose}>
            <X size={26} strokeWidth={1.7} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col py-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `px-5 py-4 text-md font-medium transition-all block ${
                  isActive ? "font-semibold" : ""
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? COLORS.accent : "transparent",
                color: isActive ? COLORS.primary : COLORS.text,
              })}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Popular Categories */}
        <div
          className="px-5 py-4  flex fixed   z-50 border-t"
          style={{ borderColor: COLORS.secondary }}>
          <h3
            className="text-sm uppercase font-semibold mb-3 tracking-wide"
            style={{ color: COLORS.primary }}>
            Popular Categories
          </h3>

          <div className="flex flex-wrap gap-3">
            {["Kurtis", "Suits", "Tops", "Ethnic Wear", "Accessories"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    navigate(`/category/${cat.toLowerCase()}`);
                    onClose();
                  }}
                  className="text-sm px-4 py-2 rounded-full transition-all"
                  style={{
                    background: COLORS.accent,
                    color: COLORS.primary,
                    border: `1px solid ${COLORS.secondary}`,
                  }}>
                  {cat}
                </button>
              )
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default NavbarDropdown;
