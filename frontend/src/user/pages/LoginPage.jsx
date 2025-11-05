import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  MapPin,
  Package,
  CreditCard,
  Shield,
  HelpCircle,
  Star,
  Truck,
} from "lucide-react";

import { COLORS } from "../../style/theme";

const tiles = [
  {
    title: "Your Orders",
    desc: "Track, return, or buy things again",
    icon: <Package size={32} />,
    link: "/account/orders",
  },
  {
    title: "Login & Security",
    desc: "Edit login, name, and mobile number",
    icon: <User size={32} />,
    link: "/account/profile",
  },
  {
    title: "Your Addresses",
    desc: "Edit addresses for orders and gifts",
    icon: <MapPin size={32} />,
    link: "/account/address",
  },
  {
    title: "Payment Options",
    desc: "Edit or add payment methods",
    icon: <CreditCard size={32} />,
    link: "/account/payment-methods",
  },
  {
    title: "Amazon Pay Balance",
    desc: "Add money or check balance",
    icon: <Shield size={32} />,
    link: "/account/wallet",
  },
  {
    title: "Prime",
    desc: "View benefits and payment settings",
    icon: <Star size={32} />,
    link: "/account/prime",
  },
  {
    title: "Your Business Account",
    desc: "Benefits & GST invoice savings",
    icon: <Truck size={32} />,
    link: "/account/business",
  },
  {
    title: "Contact Us",
    desc: "Customer service via phone or chat",
    icon: <HelpCircle size={32} />,
    link: "/contact",
  },
];

const AccountPage = () => {
  return (
    <div
      className="mt-20 min-h-screen px-6"
      style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: COLORS.primary }}>
          Your Account
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.map((tile, i) => (
            <Link
              to={tile.link}
              key={i}
              className="p-6 rounded-xl shadow-sm border bg-white hover:shadow-md transition flex items-start gap-4"
              style={{ borderColor: COLORS.secondary + "40" }}>
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: COLORS.primary }}>
                {tile.icon}
              </div>

              {/* Text */}
              <div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: COLORS.primary }}>
                  {tile.title}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{tile.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
