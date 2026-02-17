import React from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Camera,
  ChevronLeft,
  Settings,
  ShieldCheck,
  Star,
} from "lucide-react";

const ProfileHeader = ({ user, loading }) => {
  const navigate = useNavigate();

  // 1. CLEAN SKELETON (No pulsing colors, just light gray)
  if (loading) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="h-14 bg-[#232f3e]" />
        <div className="p-5 flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-100 w-1/3" />
            <div className="h-3 bg-gray-50 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const userName = user?.name || "Guest User";
  const userEmail = user?.email || "Sign in for better experience";

  return (
    <div className="bg-white border-b border-gray-200">
      {/* --- A. TOP NAV BAR (Amazon Squid Ink Color) --- */}
      <div className="flex items-center justify-between px-4 h-14 bg-[#232f3e] text-white">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 active:opacity-70 transition-opacity">
          <ChevronLeft size={22} />
          <span className="text-sm font-bold uppercase tracking-tight">
            Back
          </span>
        </button>

        <h1 className="text-xs font-bold uppercase tracking-[0.1em]">
          Your Account
        </h1>

        <button onClick={() => navigate("/settings")} className="p-2">
          <Settings size={20} className="opacity-70" />
        </button>
      </div>

      {/* --- B. USER INFO (Pure White Theme) --- */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Avatar with simple Amazon Orange Border */}
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-200 overflow-hidden">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={30} className="text-gray-300" strokeWidth={1.5} />
              )}
            </div>
            <button className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow border border-gray-100 text-gray-500">
              <Camera size={10} />
            </button>
          </div>

          {/* Identity Text */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              {userName}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              {userEmail}
            </p>

            {/* Status Badge */}
            <div className="mt-2 flex items-center gap-1">
              <ShieldCheck size={12} className="text-green-600" />
              <span className="text-[9px] font-black text-green-700 uppercase tracking-wider">
                Verified Member
              </span>
            </div>
          </div>
        </div>

        {/* Prime Indicator (Optional) */}
        {user?.isPremium && (
          <div className="flex items-center gap-1 text-[#ff9900] bg-orange-50 px-2 py-1 rounded">
            <Star size={12} fill="#ff9900" />
            <span className="text-[10px] font-bold uppercase">Prime</span>
          </div>
        )}
      </div>

      {/* --- C. UTILITY ROW (Flipkart Grid Style) --- */}
      <div className="grid grid-cols-3 border-t border-gray-100 divide-x divide-gray-100">
        <button
          onClick={() => navigate("/orders")}
          className="py-4 text-center active:bg-gray-50 transition-colors">
          <span className="block text-base font-bold text-gray-900">
            {user?.orderCount || 0}
          </span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
            Orders
          </span>
        </button>

        <button
          onClick={() => navigate("/wishlist")}
          className="py-4 text-center active:bg-gray-50 transition-colors">
          <span className="block text-base font-bold text-gray-900">
            {user?.wishlistCount || 0}
          </span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
            Wishlist
          </span>
        </button>

        <button
          onClick={() => navigate("/wallet")}
          className="py-4 text-center active:bg-gray-50 transition-colors">
          <span className="block text-base font-bold text-[#B4292F]">
            ₹{user?.wallet || 0}
          </span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
            Wallet
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
