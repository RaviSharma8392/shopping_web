import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";

import PromotionalNavbar from "./PromotinlNavbar";
import NavbarDropdwown from "../dropdown/NavbarDropdwown";

import { categoryMenuItems } from "../../data/categoryMenuItems";
import { accountMenuData } from "../../data/accountMenuData";

import { COLORS } from "../../../style/theme";
import { IMAGES } from "../../../assets/images";

const MobileNavbar = ({ cartCount = 10, promoData, wishLsitCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledValue, setScrolledValue] = useState(false);

  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ---------------------------------------
  // Determine menu items based on location
  // ---------------------------------------
  const isAccountPage = location.pathname.startsWith("/account");
  const activeMenuItems = isAccountPage ? accountMenuData : categoryMenuItems;

  // ---------------------------------------
  // Check if current page is home
  // ---------------------------------------
  const isHomePage = location.pathname === "/";
  const scrolled = isHomePage ? scrolledValue : true;

  // Scroll listener
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolledValue(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // ---------------------------------------
  // Theme-Based Dynamic Styles
  // ---------------------------------------
  const styles = {
    headerBg: scrolled ? "white" : "transparent",
    headerText: scrolled ? COLORS.textAlt : COLORS.light,
    badgeBg: COLORS.primary,
    dropdownBg: COLORS.light,
    dropdownText: COLORS.primary, // text inside menu
  };

  return (
    <header
      className="md:hidden fixed shadow top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        background: styles.headerBg,
        color: styles.headerText,
      }}>
      {/* Top Promo Slider */}
      {!scrolledValue && (
        <PromotionalNavbar
          items={promoData}
          interval={3000}
          scrolled={scrolled}
        />
      )}

      {/* NAV BAR */}
      <div
        ref={navRef}
        className={`flex items-center justify-between h-16 px-4 relative  ${
          scrolled ? "text-gray-500" : "text-white"
        }`}>
        {/* MENU ICON */}
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={26} strokeWidth={1.7} />
        </button>

        {/* LOGO */}
        <NavLink
          to="/"
          className="absolute left-1/2 -translate-x-5/2 flex items-center">
          <img
            src={!scrolled ? IMAGES.whiteAppLogo : IMAGES.appLogo}
            className="h-8 object-contain"
            alt="Logo"
          />
        </NavLink>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <NavLink
            to="/user/wishlist"
            className={`relative hover:opacity-75 ${
              scrolled ? "text-gray-500" : "text-white"
            }`}>
            <Heart size={27} strokeWidth={1.7} />
          </NavLink>

          {/* Search */}
          <button
            onClick={() => navigate("/search")}
            className={`hover:opacity-75 ${
              scrolled ? "text-gray-500" : "text-white"
            }`}>
            <Search size={23} strokeWidth={1.7} />
          </button>

          {/* Cart */}
          <NavLink
            to="/checkout/cart"
            className={`relative hover:opacity-75 ${
              scrolled ? "text-gray-500" : "text-white"
            }`}>
            <ShoppingBag size={27} strokeWidth={1.7} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center bg-[#ff356c]">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {menuOpen && (
        <div
          className="w-full shadow-lg"
          style={{
            background: styles.dropdownBg,
            color: styles.dropdownText,
          }}>
          <NavbarDropdwown
            isOpen={menuOpen}
            onClose={() => setMenuOpen(false)}
            menuItems={activeMenuItems}
            device="small"
          />
        </div>
      )}
    </header>
  );
};

export default MobileNavbar;
