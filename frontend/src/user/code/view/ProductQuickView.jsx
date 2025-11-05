import React, { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductQuickView = ({ product, open, onClose }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  // ✅ Use banner + images cleanly
  const images = [
    product.banner,
    ...(Array.isArray(product.image) ? product.image.filter(Boolean) : []),
  ];

  // ✅ Selected size state
  const sizes = product.sizes || []; // [{size:"M",available:true}]
  const colors = product.colors || [];

  useEffect(() => {
    setActiveImage(images[0]);
  }, [product]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!product) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition 
      ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }
    `}
      onClick={onClose}>
      {/* RIGHT PANEL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-white shadow-xl transition-all p-6
          fixed
          ${
            isMobile
              ? "left-0 right-0 bottom-0 rounded-t-3xl"
              : "top-0 right-0 h-full w-[420px]"
          }
          ${
            open
              ? "translate-y-0 translate-x-0"
              : isMobile
              ? "translate-y-full"
              : "translate-x-full"
          }
        `}
        style={{
          maxHeight: isMobile ? "80vh" : "100vh",
          overflowY: "auto",
        }}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-black transition">
          <X size={24} />
        </button>

        {/* ✅ IMAGE SECTION */}
        <div className="w-full mb-5">
          <img
            src={activeImage}
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl shadow-sm"
          />

          {/* Thumbnail Row */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  onClick={() => setActiveImage(img)}
                  className={`
                      w-16 h-20 object-cover rounded-lg cursor-pointer border transition
                      ${
                        activeImage === img
                          ? "border-black shadow-md"
                          : "border-gray-300"
                      }
                    `}
                />
              ))}
            </div>
          )}
        </div>

        {/* ✅ TITLE + PRICE */}
        <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>

        <p className="text-xl font-semibold text-pink-600 mt-1">
          ₹{product.price}
        </p>

        {/* ✅ DESCRIPTION */}
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
          {product.description ||
            "Premium handcrafted piece designed for comfort and elegance."}
        </p>

        {/* ✅ SIZES */}
        {sizes.length > 0 && (
          <div className="mt-6">
            <p className="font-medium text-gray-800">Size:</p>

            <div className="grid grid-cols-5 gap-3 mt-3">
              {sizes.map((s) => {
                const unavailable = s.available === false;

                return (
                  <button
                    key={s.size}
                    disabled={unavailable}
                    className={`
                      py-2 rounded-lg border text-sm font-medium relative transition
                      ${
                        unavailable
                          ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "hover:border-black"
                      }
                    `}>
                    {s.size}

                    {/* ❌ Unavailable Cross */}
                    {unavailable && (
                      <span className="absolute inset-0 flex items-center justify-center text-gray-500 opacity-70">
                        ✕
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ✅ COLORS */}
        {colors.length > 0 && (
          <div className="mt-6">
            <p className="font-medium text-gray-800">Color:</p>

            <div className="flex gap-4 mt-3">
              {colors.map((c, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full border shadow-sm"
                    style={{ background: c.hex }}></div>
                  <p className="text-xs mt-1 text-gray-600">{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ ADD TO CART BUTTON */}
        <button className="mt-8 w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition shadow">
          Add to Cart
        </button>

        {/* ✅ VIEW DETAILS BUTTON */}
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="mt-4 w-full py-3 rounded-xl border text-sm font-semibold hover:bg-gray-100 transition">
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default ProductQuickView;
