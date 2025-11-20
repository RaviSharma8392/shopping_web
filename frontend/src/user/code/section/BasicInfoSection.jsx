import React from "react";
import { Edit } from "lucide-react";

const BasicInfoSection = ({ data, onEdit }) => {
  return (
    <div className="py-4 px-6 border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className=" text-md md:text-xl font-crimson font-inter text-gray-900">
          BASIC INFORMATION
        </h3>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 hover:text-purple-700 font-inter font-medium">
          <Edit color="red" size={15} md:size={18} />
          <span className="text-sm">Edit</span>
        </button>
      </div>

      {/* 1-Line Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 font-inter">
        {/* Row */}
        <div className="flex items-center ">
          <span className="text-sm text-gray-500 w-32">First Name</span>
          <span className="text-gray-900 font-sm">{data.firstName}</span>
        </div>

        <div className="flex items-center ">
          <span className="text-sm text-gray-500 w-32">Last Name</span>
          <span className="text-gray-900 font-sm">{data.lastName}</span>
        </div>

        <div className="flex items-center ">
          <span className="text-sm text-gray-500 w-32 pr-25">Email</span>
          <span className="text-gray-900 font-sm break-all">{data.email}</span>
        </div>

        <div className="flex items-center ">
          <span className="text-sm text-gray-500 w-32">Gender</span>
          <span className="text-gray-900 font-sm">{data.gender}</span>
        </div>

        <div className="flex items-center ">
          <span className="text-sm text-gray-500 w-32">Date of Birth</span>
          <span className="text-gray-900 font-sm">{data.dateOfBirth}</span>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
