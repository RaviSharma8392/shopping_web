import { ArrowLeft } from "lucide-react";
import React from "react";

const NavigationBar = ({ product }) => {
  return (
    <div className="  flex items-center gap-2 text-sm font-crimson font-inter uppercase  text-gray-600 mb-2 md:mb-8">
      <button
        onClick={() => navigate(-1)}
        className="flex text-md font-crimson font-inter uppercase items-center gap-1 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <span>/</span>
      <button
        onClick={() => navigate("/")}
        className="text-sm font-crimson font-inter uppercase hover:text-gray-900 transition-colors">
        Home
      </button>
      <span>/</span>
      <button
        onClick={() => navigate(`/collections/${product.collectionType}`)}
        className="hover:text-gray-900 transition-colors  text-sm font-crimson font-inter uppercase">
        {product.collectionType?.replace("-", " ") || "Products"}
      </button>
      <span>/</span>
      <span className="text-gray-900 font-medium truncate text-sm font-crimson font-inter uppercase">
        {product.name}
      </span>
    </div>
  );
};

export default NavigationBar;
