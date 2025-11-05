import React from "react";
import { ChevronRight } from "lucide-react";

const ViewAllButton = ({ label = "View All", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        flex items-center gap-2 mx-auto
        px-6 py-2.5 rounded-full
        border border-gray-300
        text-gray-800 text-sm font-medium
        hover:bg-gray-100 hover:border-gray-400
        transition-all duration-300
      ">
      {label}
      <ChevronRight
        size={16}
        className="transform transition-transform duration-300 group-hover:translate-x-1"
      />
    </button>
  );
};

export default ViewAllButton;
