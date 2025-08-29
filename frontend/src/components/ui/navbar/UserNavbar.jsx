import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import SearchBar from "../searchbar/SearchBar";

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-slate-900 shadow-xl  text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <img
              src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg"
              alt="Logo"
              className="h-8 w-auto filter invert"
            />
          </NavLink>

          {/* Desktop Search & Nav Links */}
          <div className="hidden md:flex items-center flex-1 justify-center gap-8 px-8">
            <div className="flex-1 max-w-lg">
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </div>

            <nav className="flex items-center space-x-6">
              {/* Account & Orders */}
              <div className="text-sm">
                <span className="text-gray-300">
                  Hello, {user ? user.name : "Sign in"}
                </span>
                {user && (
                  <NavLink
                    to="/orders"
                    className="block text-xs text-gray-400 hover:text-white transition-colors duration-200">
                    Returns & Orders
                  </NavLink>
                )}
              </div>

              {/* Cart */}
              <NavLink
                to="/cart"
                className="relative text-white hover:text-gray-300 transition-colors duration-200">
                <FaShoppingCart size={22} />
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-900">
                  3
                </span>
              </NavLink>

              {/* User Profile */}
              <NavLink
                to="/account"
                className="text-white hover:text-gray-300 transition-colors duration-200">
                <FaUserCircle size={24} />
              </NavLink>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-gray-300 transition-colors duration-200">
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 px-4 py-4 space-y-4 shadow-md">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              className="w-full"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default UserNavbar;
