import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { ShoppingBag, User, Heart, Search, Menu } from "lucide-react";

import PromotionalNavbar from "./PromotinlNavbar";
import { COLORS } from "../../../style/theme";
import { desktopMenuItems, mobileMenuItems } from "../../config/dropdwownData";
import NavbarDropdown from "../dropdown/NavbarDropdwown";

const DesktopNavbar = ({ cartCount = 8, promoData }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const navRef = useRef(null);

  //  Scroll color change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  Close dropdown when clicking outside
  useEffect(() => {
    const closeAll = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", closeAll);
    return () => document.removeEventListener("mousedown", closeAll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? COLORS.accentAlt : "transparent",
        color: scrolled ? COLORS.textAlt : COLORS.light,
      }}>
      {/*  Promo Bar */}
      <PromotionalNavbar
        items={promoData}
        interval={3000}
        scrolled={scrolled}
      />

      {/*  Desktop Navbar */}
      <div
        ref={navRef}
        className="w-full max-w-[1500px] mx-auto h-20 flex items-center justify-between px-8 relative">
        {/*  LEFT — LOGO */}
        <NavLink to="/" className="flex items-center">
          <img
            src="https://babli.in/cdn/shop/files/logo.png?v=1701265077&width=270"
            alt="Logo"
            className="h-14 object-contain"
          />
        </NavLink>

        {/*  CENTER — CATEGORY MENU */}
        <nav className="flex items-center gap-8">
          {desktopMenuItems.slice(0, 8).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="text-sm font-medium tracking-wide hover:opacity-70 transition"
              style={{ color: scrolled ? COLORS.textAlt : COLORS.light }}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/*  RIGHT — ICONS */}
        <div className="flex items-center gap-6 relative">
          <button
            onClick={() => navigate("/search")}
            className="hover:opacity-70">
            <Search size={22} />
          </button>

          <NavLink to="/wishlist" className="hover:opacity-70">
            <Heart size={22} />
          </NavLink>

          <NavLink to="/cart" className="relative hover:opacity-70">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                style={{ background: COLORS.primaryAlt }}>
                {cartCount}
              </span>
            )}
          </NavLink>

          <button
            onClick={() => navigate("/account")}
            className="hover:opacity-70">
            <User size={26} />
          </button>

          {/*  MENU ICON FOR EXTRA NAV */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="hover:opacity-70">
            <Menu size={26} />
          </button>

          {/*  CLEAN DROPDOWN — NOT FULL WIDTH */}
          {menuOpen && (
            <div
              className="absolute top-14 right-0 w-56 rounded-lg shadow-xl z-50"
              style={{ background: COLORS.light, color: COLORS.textAlt }}>
              <NavbarDropdown
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                menuItems={mobileMenuItems}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopNavbar;
