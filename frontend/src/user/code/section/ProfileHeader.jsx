import React from "react";
import { User } from "lucide-react";

const ProfileHeader = ({ user = {} }) => {
  const firstName = user.firstName || "RAVI";
  const lastName = user.lastName || "SHARMA";
  const email = user.email || "your-email@example.com";

  return (
    <div className="bg-[#FFFBF4] md:rounded-2xl shadow-sm p-6  mb-4 md:mb-6 border border-red-100">
      <div className="flex items-center space-x-4">
        {/* USER ICON */}
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow">
          <User size={28} strokeWidth={2} className="text-red-800" />
        </div>

        {/* NAME + EMAIL */}
        <div>
          <h2 className=" text-md md:text-xl font-[arial] text-gray-900">
            {firstName} {lastName}
          </h2>
          <p className="text-gray-700 text-sm">{email}</p>
        </div>
      </div>

      {/* FOOTER TEXT */}
      <p className="text-xs text-gray-600 mt-4 ml-1">
        Complete profile for better suggestions.
      </p>
    </div>
  );
};

export default ProfileHeader;
