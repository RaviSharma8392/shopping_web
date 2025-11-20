import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="text-center py-20 text-gray-600 flex flex-col items-center gap-4">
      {/* 🛒 Editable SVG */}
      <svg width="120" height="120" viewBox="0 0 200 200" className="w-28 h-28">
        {/* Cart Outline */}
        <path
          d="M50 50h120l-15 70H70L50 50z"
          fill="#fff"
          stroke="#FF356C" // ⭐ cart border color
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Cart Handle */}
        <path
          d="M60 40c0-10 10-20 20-20h40"
          fill="none"
          stroke="#FF356C" // ⭐ handle color
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Wheels */}
        <circle cx="80" cy="140" r="12" fill="#FF356C" />
        <circle cx="140" cy="140" r="12" fill="#FF356C" />

        {/* Cross Icon (Empty Effect) */}
        <line
          x1="85"
          y1="85"
          x2="135"
          y2="115"
          stroke="#FF356C"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="135"
          y1="85"
          x2="85"
          y2="115"
          stroke="#FF356C"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <h2 className="text-lg font-semibold text-gray-800">
        Your Cart is Empty
      </h2>

      <p className="text-gray-500 px-5">
        Looks like you haven't made any choices yet{" "}
      </p>

      <Link
        to="/collections/all"
        className="bg-[#FF3F6C] uppercase text-white font-semibold py-1.5 px-4  mt-5 shadow hover:bg-pink-600 transition">
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
