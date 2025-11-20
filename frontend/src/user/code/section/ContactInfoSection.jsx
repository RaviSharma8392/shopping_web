// components/account/sections/ContactInfoSection.jsx
import React from "react";
import { Edit } from "lucide-react";

const ContactInfoSection = ({ data, onEdit }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md  uppercase md:text-xl font-crimson font-inter text-gray-900">
          Contact Information
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Mobile Number
            </label>
            <p className="text-gray-900 font-medium">{data.mobile}</p>
          </div>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 underline hover:text-purple-700 font-inter font-medium">
            <Edit color="red" size={15} md:size={18} />
            <span className="text-sm">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
