import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";

import PromotionalNavbar from "../../common/bars/PromotinlNavbar";
import NavbarDropdwown from "../dropdown/NavbarDropdwown";
import SearchBar from "../searchbar/SearchBar";
import { mobileMenuItems } from "../../../config/menuData";
import { COLORS } from "../../../style/theme";

const MobileNavbar = ({ cartCount = 8, promoData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Background changes on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const closeAll = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", closeAll);
    return () => document.removeEventListener("mousedown", closeAll);
  }, []);

  // ✅ Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setSearchOpen(false);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: scrolled ? COLORS.accentAlt : "transparent",
        color: scrolled ? COLORS.textAlt : COLORS.light,
      }}>
      {/* ✅ Top Promo Slider */}
      <PromotionalNavbar
        items={promoData}
        interval={3000}
        scrolled={scrolled}
      />

      {/* ✅ Main Navbar */}
      <div
        ref={navRef}
        className="flex items-center justify-between h-16 px-4 relative">
        {/* ✅ Left: Menu Icon */}
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={26} strokeWidth={1.7} />
        </button>

        {/* ✅ Center Logo */}
        <NavLink
          to="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <img
            src="https://babli.in/cdn/shop/files/logo.png?v=1701265077&width=270"
            className="h-10 object-contain"
            alt="Logo"
          />
        </NavLink>

        {/* ✅ Right: Icons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/search")}
            className="hover:opacity-70">
            <Search size={22} strokeWidth={1.7} />
          </button>

          <NavLink to="/wishlist" className="hover:opacity-70">
            <Heart size={22} strokeWidth={1.7} />
          </NavLink>

          <NavLink to="/cart" className="relative hover:opacity-70">
            <ShoppingBag size={22} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: COLORS.primaryAlt }}>
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {/* ✅ Dropdown (Mobile Menu) */}
      {menuOpen && (
        <div
          className="w-full shadow-lg"
          style={{
            background: COLORS.light,
            color: COLORS.primaryAlt,
          }}>
          <NavbarDropdwown
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            menuItems={mobileMenuItems}
          />
        </div>
      )}

      {/* ✅ Search Dropdown */}
      {searchOpen && (
        <div
          className="w-full shadow-md py-3 px-4"
          style={{ background: COLORS.accentAlt }}>
          <form onSubmit={handleSearch}>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch}
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default MobileNavbar;
