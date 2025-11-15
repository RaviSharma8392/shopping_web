import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price * (item.qty || 1);
  }, 0);

  return (
    <div className="max-w-5xl mx-auto p-5 mt-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-medium text-gray-600">
            Your cart is empty 😕
          </h2>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 px-6 py-3 bg-black text-white rounded-xl">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT - CART ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-xl shadow-sm">
                {/* IMAGE */}
                <img
                  src={item.selectedImage || item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-pink-600 font-semibold">₹{item.price}</p>

                  {item.selectedSize && (
                    <p className="text-sm text-gray-500">
                      Size: {item.selectedSize}
                    </p>
                  )}

                  {item.selectedColor && (
                    <p className="text-sm text-gray-500">
                      Color: {item.selectedColor}
                    </p>
                  )}

                  <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="border p-5 rounded-xl shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>

            <button className="mt-5 w-full bg-black text-white py-3 rounded-xl font-semibold">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
