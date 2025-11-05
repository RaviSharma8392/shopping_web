import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { COLORS } from "../../../style/theme";

const AccountNavbar = () => {
  return (
    <nav
      className="w-full px-6 py-4 flex items-center justify-between border-b shadow-sm sticky top-0 bg-white z-50"
      style={{ borderColor: COLORS.secondary + "30" }}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="https://babli.in/cdn/shop/files/logo.png?v=1701265077&width=270"
          alt="logo"
          className="h-10 w-auto object-contain"
        />
      </Link>

      {/* Middle Navigation */}
      <div className="flex items-center gap-6">
        <Link
          to="/account/orders"
          className="font-medium hover:text-black transition"
          style={{ color: COLORS.primary }}>
          Orders
        </Link>

        <Link
          to="/account/return-exchange"
          className="font-medium hover:text-black transition"
          style={{ color: COLORS.primary }}>
          Return / Exchange
        </Link>
      </div>

      {/* Profile Icon */}
      <Link
        to="/account/profile"
        className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:opacity-90 transition"
        style={{ backgroundColor: COLORS.primary }}>
        <User size={20} />
      </Link>
    </nav>
  );
};

export default AccountNavbar;
