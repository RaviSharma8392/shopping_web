import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const WhatsAppPopup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Get Number from Env (Fallback to hardcoded if missing)
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919999999999";

  // 2. Pre-filled Message
  const message = encodeURIComponent(
    "Namaste! I'm interested in a product on ShopMnMukt. Can you help me with details?",
  );

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  // 3. Auto-open after 3 seconds to grab attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-25 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* --- EXPANDED CARD --- */}
      <div
        className={`
          transition-all duration-500 ease-in-out origin-bottom-right
          ${isExpanded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none absolute"}
        `}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-xs w-72 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute -top-3 -right-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full p-1.5 shadow-sm transition-colors">
            <FaTimes size={12} />
          </button>

          {/* Card Content */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 group">
            {/* Avatar / Icon */}
            <div className="relative">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <FaWhatsapp size={28} />
              </div>
              {/* Online Dot */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
              </span>
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Need Help?
              </p>
              <p className="text-xs text-gray-500 leading-relaxed mt-0.5">
                Chat with our personal stylist for instant size & style advice.
              </p>
              <p className="text-[10px] font-bold text-green-600 mt-2 flex items-center gap-1">
                ⚡ Replies in 5 mins
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* --- MINIMIZED FLOATING BUTTON --- */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {/* Tooltip on Hover */}
        <div
          className={`
            absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-300
            ${isHovered && !isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}
        `}>
          Chat with us
          {/* Arrow */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>

        {/* The Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 relative
            ${isExpanded ? "bg-gray-100 text-gray-600 rotate-0" : "bg-[#25D366] text-white hover:scale-110 hover:shadow-green-300/50"}
          `}>
          {isExpanded ? (
            <FaTimes size={20} />
          ) : (
            <>
              <FaWhatsapp size={30} />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                1
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default WhatsAppPopup;
