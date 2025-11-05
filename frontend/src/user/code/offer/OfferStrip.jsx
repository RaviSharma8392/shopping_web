import React from "react";
import {
  Truck,
  RefreshCw,
  BadgeIndianRupee,
  ShieldCheck,
  Gift,
} from "lucide-react";

const OfferMarquee = () => {
  const items = [
    { icon: <Truck size={20} />, text: "Free Shipping Above ₹999" },
    {
      icon: <BadgeIndianRupee size={20} />,
      text: "Cash on Delivery Available",
    },
    { icon: <RefreshCw size={20} />, text: "Easy 7-Day Returns" },
    { icon: <ShieldCheck size={20} />, text: "100% Secure Payments" },
    { icon: <Gift size={20} />, text: "Festive Offers Live Now" },
  ];

  return (
    <div className="w-full bg-[#F3EBDD] border-y border-gray-300 py-4 overflow-hidden">
      {/* Scroll Container */}
      <div className="flex items-center whitespace-nowrap animate-marquee gap-16 text-base md:text-lg font-medium text-gray-900 tracking-wide">
        {items.concat(items).map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-6">
            <span className="text-gray-800">{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Animation */}
      <style>{`
        .animate-marquee {
          display: inline-flex;
          animation: marquee 20s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default OfferMarquee;
