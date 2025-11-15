import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { ShoppingBag, User, Heart, Search, Menu } from "lucide-react";
import PromotionalNavbar from "./PromotinlNavbar";
import NavbarDropdown from "../dropdown/NavbarDropdwown";

import { COLORS } from "../../../style/theme";

const DesktopNavbar = ({
  logo = "https://scontent-bom2-3.xx.fbcdn.net/v/t39.30808-1/535187279_122112054182963156_8422769492479945953_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=101&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=mk7yv4oDhhgQ7kNvwELBfeW&_nc_oc=AdnKYoLzv8rfVeWv4m_chsYri_7uILtOVhFUfDdP_ksaz-P8wBK9IP8t4rnQ0XhHRDk&_nc_zt=24&_nc_ht=scontent-bom2-3.xx&_nc_gid=zY2sPDpq_dM8cZsBNKWvcw&oh=00_AfiAZsvdjjRpsABI2g5871WvueP-3gim0ZMrs-Om-IT9WA&oe=691DD5FB",
  cartCount = 0,
  promoData = [],
  desktopMenuItems = [],
  mobileMenuItems = [],
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const navigate = useNavigate();

  // Scroll background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
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
      {/* Promo Bar */}
      <PromotionalNavbar
        items={promoData}
        interval={3000}
        scrolled={scrolled}
      />

      {/* Desktop Navbar */}
      <div
        ref={navRef}
        className="w-full max-w-[1500px] mx-auto h-20 flex items-center justify-between px-8 relative">
        {/* Left — Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-14 object-contain" />
        </NavLink>

        {/* Center — Category Menu */}
        <nav className="hidden md:flex items-center gap-8">
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

        {/* Right — Icons */}
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

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="hover:opacity-70 md:hidden">
            <Menu size={26} />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              className="absolute top-14 right-0 w-56 rounded-lg shadow-xl z-50 md:hidden"
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
