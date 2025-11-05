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
  Briefcase,
} from "lucide-react";

import { COLORS } from "../../style/theme";
import AccountNavbar from "../code/bars/AccountNavbar";

const tiles = [
  {
    title: "Your Orders",
    desc: "Track, return, reorder items",
    icon: Package,
    link: "/account/orders",
  },
  {
    title: "Login & Security",
    desc: "Manage your login, email & phone",
    icon: User,
    link: "/account/profile",
  },
  {
    title: "Addresses",
    desc: "Edit or add delivery addresses",
    icon: MapPin,
    link: "/account/address",
  },
  {
    title: "Payment Methods",
    desc: "Manage your cards & UPI",
    icon: CreditCard,
    link: "/account/payment-methods",
  },
  {
    title: "Wallet",
    desc: "Check balance & add funds",
    icon: Shield,
    link: "/account/wallet",
  },
  {
    title: "Membership",
    desc: "View benefits & subscriptions",
    icon: Star,
    link: "/account/prime",
  },
  {
    title: "Business Account",
    desc: "GST invoice & credit purchases",
    icon: Briefcase,
    link: "/account/business",
  },
  {
    title: "Support",
    desc: "Chat or contact our support team",
    icon: HelpCircle,
    link: "/contact",
  },
];

const AccountPage = () => {
  return (
    <div
      className=" min-h-screen "
      style={{ backgroundColor: COLORS.background }}>
      <AccountNavbar />
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1
          className="text-4xl font-bold mb-10"
          style={{ color: COLORS.primary }}>
          Your Account
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiles.map((tile, i) => (
            <Link
              to={tile.link}
              key={i}
              className="group p-6 rounded-2xl border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-out flex items-start gap-4"
              style={{
                borderColor: COLORS.secondary + "40",
              }}>
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white shrink-0"
                style={{
                  backgroundColor: COLORS.primary,
                }}>
                <tile.icon size={30} />
              </div>

              {/* Text */}
              <div className="pt-1">
                <h2
                  className="text-lg font-semibold mb-1 group-hover:underline"
                  style={{ color: COLORS.primary }}>
                  {tile.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tile.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
