import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";

import PromotionalNavbar from "./PromotinlNavbar";
import NavbarDropdown from "../dropdown/NavbarDropdwown";

import { categoryMenuItems } from "../../data/categoryMenuItems";
import { accountMenuData } from "../../data/accountMenuData";
import { IMAGES } from "../../../../../assets/images";

const MobileNavbar = ({ cartCount = 0, promoData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledValue, setScrolledValue] = useState(false);

  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ------------------------------------------------
  // 1. LOGIC: Switch Menu based on Page Context
  // ------------------------------------------------
  const isAccountPage = location.pathname.startsWith("/account");
  const activeMenuItems = isAccountPage ? accountMenuData : categoryMenuItems;

  // ------------------------------------------------
  // 2. LOGIC: Navbar Transparency & Background
  // ------------------------------------------------
  const isHomePage = location.pathname === "/";
  // If Home: Transparent until scrolled. If Inner Page: Always White.
  const scrolled = isHomePage ? scrolledValue : true;

  useEffect(() => {
    const handleScroll = () => setScrolledValue(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          md:hidden fixed top-0 left-0 w-full z-40 transition-all duration-300 font-sans
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
              : "bg-linear-to-b from-black/60 to-transparent"
          }
        `}>
        {/* Top Promo Slider (Only on Home, hidden when scrolled) */}
        {isHomePage && !scrolledValue && (
          <div className="transition-all duration-500 ease-out">
            <PromotionalNavbar
              items={promoData}
              interval={3000}
              scrolled={scrolled}
            />
          </div>
        )}

        {/* --- MAIN NAVBAR CONTENT --- */}
        <div
          ref={navRef}
          className={`flex items-center justify-between h-[60px] px-4 relative transition-colors duration-300 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}>
          {/* LEFT: Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-2 active:scale-95 transition-transform hover:opacity-80"
            aria-label="Open Menu">
            <Menu size={26} strokeWidth={1.5} />
          </button>

          {/* CENTER: Logo */}
          <NavLink
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center transition-opacity duration-300">
            <img
              src={!scrolled ? IMAGES.brand.logoWhite : IMAGES.brand.logo}
              className="h-8 w-auto object-contain"
              alt="Mnmukt Logo"
            />
          </NavLink>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => navigate("/search")}
              className="hover:opacity-70 transition-opacity"
              aria-label="Search">
              <Search size={22} strokeWidth={2} />
            </button>

            {/* Wishlist */}
            <NavLink
              to="/wishlist"
              className="hover:opacity-70 transition-opacity"
              aria-label="Wishlist">
              <Heart size={22} strokeWidth={2} />
            </NavLink>

            {/* Cart */}
            <NavLink
              to="/checkout/cart"
              className="relative hover:opacity-70 transition-opacity"
              aria-label="Cart">
              <ShoppingBag size={22} strokeWidth={2} />

              {/* Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm border border-white/20">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </header>

      {/* 3. SIDEBAR DROPDOWN 
        Rendered here to be independent of the header's layout constraints.
        It has its own Z-Index (50) to slide OVER the navbar.
      */}
      <NavbarDropdown
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        menuItems={activeMenuItems}
      />
    </>
  );
};

export default MobileNavbar;
