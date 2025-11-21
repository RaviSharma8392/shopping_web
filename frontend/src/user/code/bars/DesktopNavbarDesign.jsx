import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import PromotionalNavbar from "./PromotinlNavbar";
import NavbarDropdown from "../dropdown/NavbarDropdwown";
import SearchBar from "./SearchBar";
import NavbarRightIcons from "./NavbarRightIcons";
import { IMAGES } from "../../../assets/images";

import { rightSideDesktopNavbarIcons } from "../../data/navbarIcons";
import { desktopMenuItems } from "../../data/navbarMenuItems";
import { promoData } from "../../data/promoData";

const DesktopNavbar = ({
  app_name = "Mnmukt",
  cartCount,
  mobileMenuItems = [],
}) => {
  const [scrolledValue, setScrolledValue] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const isHomePage = window.location.pathname === "/";

  const scrolled = isHomePage ? scrolledValue : true;

  const menuItems = rightSideDesktopNavbarIcons(navigate, cartCount);

  useEffect(() => {
    const handleScroll = () => setScrolledValue(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed pb-10 top-0 left-0 w-full z-40 transition-all duration-300 
      ${
        scrolled ? "bg-white shadow-md text-black" : "bg-transparent text-white"
      }`}>
      <PromotionalNavbar
        items={promoData}
        interval={3000}
        scrolled={scrolled}
      />

      <div
        ref={navRef}
        className="w-full max-w-[1500px] mx-auto h-24 flex items-center justify-between px-10 relative">
        {/* LOGO */}
        <div className="flex items-center gap-10">
          <img
            src={!scrolled ? IMAGES.whiteAppLogo : IMAGES.appLogo}
            alt={app_name + " logo"}
            className="w-28 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Country */}
          <div
            className={`flex items-center text-sm gap-2 ${
              scrolled ? "text-gray-700" : "text-white"
            }`}>
            <span>Ship to</span>
            <img
              src="https://flagcdn.com/w20/in.png"
              className="w-5 h-4"
              alt="India"
            />
            <span>India (₹)</span>
          </div>
        </div>

        <SearchBar scrolled={scrolled} />
        <NavbarRightIcons
          scrolled={scrolled}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          menuItems={menuItems}
          mobileMenuItems={mobileMenuItems}
          DropdownComponent={NavbarDropdown}
        />
      </div>

      {/* CATEGORY MENU */}
      <nav
        className={`hidden md:flex gap-10 justify-center text-sm font-medium mt-3 transition-all 
        ${scrolled ? "text-black" : "text-white"}`}>
        {desktopMenuItems.slice(0, 12).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="hover:text-red-600 transition">
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default DesktopNavbar;
