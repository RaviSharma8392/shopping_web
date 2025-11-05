import React from "react";
import { motion } from "framer-motion";

export const COLORS = {
  primary: "#D63384",
  secondary: "#F8C8DC",
  tertiary: "#6A4C93",
  accent: "#FFF0F5",
  text: "#2C1A27",
  dark: "#1d1420",
  light: "#ffffff",
  primaryAlt: "#6A4C93",
  secondaryAlt: "#C7B8EA",
  accentAlt: "EDE7F6",
  textAlt: "#2D2342",
};

export default function QuickViewSidebar({ product, open, onClose }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 p-4 overflow-y-auto rounded-l-2xl">
      <button
        onClick={onClose}
        className="text-gray-600 hover:text-black mb-4 text-sm">
        ✕ Close
      </button>

      <div className="space-y-4">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-48 object-cover rounded-xl"
        />

        <h2 className="text-xl font-semibold">{product?.title}</h2>
        <p className="text-gray-500 text-sm">{product?.description}</p>

        <div>
          <h3 className="font-medium mb-1">Size</h3>
          <div className="flex gap-2">
            {product?.sizes?.map((size) => (
              <button
                key={size}
                className="px-3 py-1 border rounded-xl text-sm hover:bg-gray-100">
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="text-2xl font-bold">₹{product?.price}</div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-black text-white py-2 rounded-xl shadow">
            Add to Cart
          </button>
          <button className="flex-1 bg-green-600 text-white py-2 rounded-xl shadow">
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
