import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppPopup = ({ phoneNumber = "+911234567890" }) => {
  const [expanded, setExpanded] = useState(true);

  const message = encodeURIComponent(
    "Namaste! I'm interested in this product and I have a few questions. Can you help? https://shopManmukt.com"
  );
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-25 right-4  z-50 ">
      {expanded ? (
        // Expanded popup
        <div className="flex items-center rounded-full  bg-green-500 text-white px-8 py-3  shadow-lg max-w-xs w-full md:max-w-none animate-slide-in">
          {/* Close Button */}
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-0 right-0 mt-1 mr-2 px-2 text-white font-bold text-lg hover:text-gray-200">
            &times;
          </button>

          {/* WhatsApp Link */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full">
            <FaWhatsapp size={28} />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">
                Connect with Stylist
              </span>
              <span className="text-xs">Same day delivery</span>
            </div>
          </a>
        </div>
      ) : (
        // Minimized icon
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
          <FaWhatsapp size={24} />
        </a>
      )}
    </div>
  );
};

export default WhatsAppPopup;
