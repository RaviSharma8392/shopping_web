import React from "react";
import {
  Package,
  Heart,
  CreditCard,
  Headset,
  MapPin,
  User,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";
import ProfileHeader from "../components/section/ProfileHeader";
import { useAuth } from "../features/auth/context/UserContext";

const ProfilePage = () => {
  const { user, loading, logout } = useAuth();

  if (loading)
    return (
      <div className="bg-white min-h-screen p-6 animate-pulse">
        <div className="h-32 bg-gray-100 rounded-lg mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 bg-gray-50 rounded-md" />
          ))}
        </div>
      </div>
    );

  return (
    <div className="bg-[#f1f3f6] min-h-screen pb-20">
      {/* 1. DYNAMIC HEADER (Amazon/Flipkart Style) */}
      <ProfileHeader user={user} loading={loading} />

      <div className="max-w-4xl mx-auto md:mt-4">
        {/* 2. ORDER ACTIONS (High Priority - Flipkart Type) */}
        <div className="bg-white mb-2 shadow-sm border-b border-gray-100">
          <div className="grid grid-cols-2 divide-x divide-gray-50">
            <button className="flex items-center gap-3 px-6 py-4 active:bg-gray-50 transition-colors">
              <Package size={20} className="text-[#2874f0]" />
              <span className="text-[14px] font-medium text-gray-800">
                My Orders
              </span>
            </button>
            <button className="flex items-center gap-3 px-6 py-4 active:bg-gray-50 transition-colors">
              <Heart size={20} className="text-[#2874f0]" />
              <span className="text-[14px] font-medium text-gray-800">
                Wishlist
              </span>
            </button>
          </div>
        </div>

        {/* 3. ACCOUNT SETTINGS SECTION (Shopify List Style) */}
        <div className="bg-white mb-2 shadow-sm">
          <h3 className="px-6 py-3 text-[12px] font-bold text-gray-400 uppercase tracking-tight">
            Account Settings
          </h3>

          <div className="flex flex-col">
            {[
              { label: "Edit Profile", icon: User, path: "/profile/edit" },
              { label: "Saved Addresses", icon: MapPin, path: "/addresses" },
              { label: "Saved Cards", icon: CreditCard, path: "/payments" },
              { label: "Notifications", icon: Bell, path: "/notifications" },
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center justify-between px-6 py-4 border-t border-gray-50 active:bg-gray-50">
                <div className="flex items-center gap-4">
                  <item.icon size={20} className="text-[#2874f0]" />
                  <span className="text-[15px] text-gray-700">
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        {/* 4. FEEDBACK & LEGAL */}
        <div className="bg-white mb-2 shadow-sm">
          <h3 className="px-6 py-3 text-[12px] font-bold text-gray-400 uppercase tracking-tight">
            Support & Feedback
          </h3>
          <div className="flex flex-col">
            <button className="flex items-center justify-between px-6 py-4 border-t border-gray-50 active:bg-gray-50">
              <div className="flex items-center gap-4">
                <Headset size={20} className="text-[#2874f0]" />
                <span className="text-[15px] text-gray-700">Help Center</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
            <button className="flex items-center justify-between px-6 py-4 border-t border-gray-50 active:bg-gray-50">
              <div className="flex items-center gap-4">
                <ShieldCheck size={20} className="text-[#2874f0]" />
                <span className="text-[15px] text-gray-700">
                  Privacy Policy
                </span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </button>
          </div>
        </div>

        {/* 5. LOGOUT BUTTON */}
        <div className="p-4 px-6">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 bg-white text-red-600 font-bold rounded-md shadow-sm active:bg-red-50 transition-colors">
            <LogOut size={18} />
            Logout
          </button>

          <p className="text-center text-[10px] text-gray-400 mt-6 font-medium uppercase tracking-widest">
            v2.0.4 • Mnmukt Organics
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
