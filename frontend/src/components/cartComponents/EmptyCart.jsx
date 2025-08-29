import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h3 className="text-xl font-medium text-gray-700 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500 mb-6">You haven't added any items yet.</p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition">
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
