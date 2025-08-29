import React from "react";
import { Minus, Plus, Trash2, Loader } from "lucide-react";
import { toast } from "react-toastify";

const CartItem = ({ item, onQuantityChange, onRemove, isUpdating }) => {
  const formatPrice = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);

  const priceObj =
    item.item.price.find((p) => p.unit === item.unit) || item.item.price[0];
  const unitPrice = priceObj?.price || 0;
  const totalPrice = unitPrice * item.quantity;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      toast.warning("Quantity cannot be less than 1");
      return;
    }
    if (newQuantity > 10) {
      toast.info("Maximum quantity limit reached (10 items)");
      return;
    }
    onQuantityChange(item.productId, item.unit, newQuantity);
  };

  const handleRemove = () => {
    toast.info(
      <div>
        <p>Removing {item.item.name} from cart...</p>
        <p className="text-sm text-gray-600">Unit: {item.unit}</p>
      </div>,
      {
        autoClose: 2000,
        closeButton: false,
      }
    );
    onRemove(item.productId, item.unit);
  };

  const handleDecrement = () => {
    if (item.quantity === 1) {
      toast.warning(
        <div>
          <p>Quantity cannot be less than 1</p>
          <p className="text-sm">Click the trash icon to remove item</p>
        </div>,
        { autoClose: 3000 }
      );
      return;
    }
    handleQuantityChange(item.quantity - 1);
  };

  const handleIncrement = () => {
    if (item.quantity >= 10) {
      toast.info("Maximum quantity limit reached (10 items per product)");
      return;
    }
    handleQuantityChange(item.quantity + 1);
  };

  return (
    <div
      className={`
        flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 
        border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md 
        transition-all duration-300
        ${
          isUpdating ? "opacity-60 cursor-not-allowed" : "hover:border-gray-300"
        }
      `}>
      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src={item.item.coverImage}
          alt={item.item.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-gray-200"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80?text=No+Image";
            e.target.className =
              "w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-gray-100 border border-gray-200";
          }}
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2">
          {item.item.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Unit: <span className="font-medium">{item.unit}</span>
        </p>
        <p className="text-orange-600 font-semibold text-lg mt-2">
          {formatPrice(unitPrice)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <span className="text-sm text-gray-600 sm:hidden">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={handleDecrement}
            disabled={isUpdating || item.quantity <= 1}
            className="p-2 sm:p-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity">
            <Minus size={16} />
          </button>

          <span className="px-3 py-1 sm:px-4 sm:py-2 bg-white text-gray-900 font-medium min-w-[2.5rem] text-center border-x border-gray-200">
            {isUpdating ? (
              <Loader className="animate-spin mx-auto" size={16} />
            ) : (
              item.quantity
            )}
          </span>

          <button
            onClick={handleIncrement}
            disabled={isUpdating || item.quantity >= 10}
            className="p-2 sm:p-1 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Total Price and Remove Button */}
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
        {/* Total Price */}
        <div className="text-right sm:text-left">
          <p className="text-xs text-gray-500 sm:hidden">Total:</p>
          <p className="font-semibold text-lg text-gray-900">
            {formatPrice(totalPrice)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          disabled={isUpdating}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors group"
          aria-label="Remove item from cart">
          {isUpdating ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            <div className="flex items-center gap-1 group-hover:gap-2 transition-all">
              <Trash2 size={18} />
              <span className="text-sm hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                Remove
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
