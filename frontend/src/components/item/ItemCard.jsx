import React, { useState } from "react";
import {
  FaPlus,
  FaSpinner,
  FaShoppingCart,
  FaEye,
  FaRupeeSign,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { CartService } from "../../services/cartService";

const ItemCard = ({ item, onDetailClick }) => {
  const [adding, setAdding] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(item);

  const handleAddToCart = async (e, itemId, unit) => {
    e.stopPropagation(); // Prevent triggering the card click

    if (!user) {
      toast.info("Please login to add items to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      setAdding(true);
      await CartService.addToCart(user._id, itemId, 1, unit);

      toast.success("🛒 Item added to cart!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div
      className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full cursor-pointer"
      onClick={onDetailClick}>
      {/* Product Image with overlay on hover */}
      <div className="relative aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={
            item.coverImage ||
            "https://via.placeholder.com/300x300?text=Product+Image"
          }
          alt={item.name}
        />

        {/* Quick add button - visible on hover */}
        <div className="absolute top-2 right-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-green-500 hover:text-white text-gray-700 transition-all duration-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => handleAddToCart(e, item._id, item.price[0].unit)}
            disabled={adding}>
            {adding ? (
              <FaSpinner className="animate-spin text-xs" />
            ) : (
              <FaPlus className="text-xs" />
            )}
          </button>
        </div>

        {/* View details hint on hover */}
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-white text-sm font-medium bg-black bg-opacity-70 px-3 py-1 rounded-full">
            <FaEye className="mr-1 text-xs" /> View details
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col p-3 flex-1">
        <h2 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10">
          {item.name}
        </h2>

        {/* Price & Unit */}
        {item.price?.length > 0 && (
          <div className="flex items-center justify-between text-gray-700 mt-auto">
            <div className="flex items-center">
              <FaRupeeSign className="text-gray-900 text-sm" />
              <span className="text-base font-bold text-gray-900 ml-1">
                {item.price[0].price.toFixed(2)}
              </span>
              <span className="ml-1 text-xs font-medium text-gray-500">
                / {item.price[0].unit}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
