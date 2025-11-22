import React from "react";

const AddressCard = ({ address, onEdit }) => {
  if (!address) return null;

  return (
    <div className="relative p-5  bg-white  transition-shadow duration-200">
      {/* Default Badge */}
      <span className="absolute top-3 left-3 bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold rounded-full">
        HOME
      </span>

      {/* Edit/Change Button */}
      <button
        onClick={onEdit}
        className="absolute top-3 right-3 text-pink-500 font-medium text-sm hover:text-pink-700 transition-colors">
        {address ? "EDIT" : "ADD"}
      </button>

      {/* Address Info */}
      <div className="mt-6 space-y-1">
        <p className="font-semibold text-sm text-gray-800">{address.name}</p>
        <p className="text-gray-600 text-sm">
          {address.line1}, {address.line2}
        </p>
        <p className="text-gray-600 text-sm">
          {address.city}, {address.state} - {address.pincode}
        </p>
        <p className="text-gray-600 text-sm">Mobile: {address.phone}</p>
      </div>

      {/* Optional: COD / Delivery Info */}
      <div className="mt-3 text-sm text-gray-500">
        <p>• Delivery available in 2-3 business days</p>
        <p>• Pay on Delivery: Available</p>
      </div>
    </div>
  );
};

export default AddressCard;
