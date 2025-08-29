import React, { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../../components/cartComponents/CartItem";
import OrderSummary from "../../components/cartComponents/OrderSummary";
import EmptyCart from "../../components/cartComponents/EmptyCart";
import LoginPopup from "../../components/cartComponents/LoginPopup";
import { CartService } from "../../services/cartService";
import { api } from "../../config/config";
import { Loader } from "lucide-react";

const { getCart, updateCart, removeFromCart, placeOrder } = CartService;

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [updatingItem, setUpdatingItem] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch cart with full product details
  useEffect(() => {
    const fetchCartWithDetails = async () => {
      if (!user?._id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await getCart(user._id);

        const itemsWithDetails = await Promise.all(
          data.items.map(async (cartItem) => {
            try {
              const res = await axios.get(`${api}/item/${cartItem.productId}`);
              const itemDetails = res.data.data;

              return {
                ...cartItem,
                item: itemDetails,
                unit:
                  cartItem.unit ||
                  (itemDetails.price.length ? itemDetails.price[0].unit : ""),
              };
            } catch (error) {
              console.error(
                `Error fetching item ${cartItem.productId}:`,
                error
              );
              return null;
            }
          })
        );

        // Filter out any failed requests
        const validItems = itemsWithDetails.filter((item) => item !== null);
        setCart(validItems);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartWithDetails();
  }, [user?._id]);

  // Update quantity for a cart item
  const handleQuantityChange = async (productId, unit, quantity) => {
    if (quantity < 1) return;

    setUpdatingItem(`${productId}-${unit}`);
    try {
      const data = await updateCart(user._id, productId, quantity, unit);

      // Update the specific item in the cart state
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId && item.unit === unit
            ? { ...item, quantity }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setUpdatingItem(null);
    }
  };

  // Remove an item from cart
  const handleRemove = async (productId, unit) => {
    setUpdatingItem(`${productId}-${unit}`);
    try {
      await removeFromCart(user._id, productId, unit);

      // Remove the item from the cart state
      setCart((prevCart) =>
        prevCart.filter(
          (item) => !(item.productId === productId && item.unit === unit)
        )
      );
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item. Please try again.");
    } finally {
      setUpdatingItem(null);
    }
  };

  // Calculate subtotal
  const subtotal = cart.reduce((acc, cartItem) => {
    const priceObj =
      cartItem.item.price.find((p) => p.unit === cartItem.unit) ||
      cartItem.item.price[0];
    return acc + cartItem.quantity * (priceObj?.price || 0);
  }, 0);

  const deliveryFee = subtotal > 0 && subtotal < 500 ? 50 : 0;
  const total = subtotal + deliveryFee;

  // Place order
  const handlePlaceOrder = async () => {
    if (!user) {
      setShowPopup(true);
      return;
    }
    if (subtotal < 299) {
      alert("Minimum order value is ₹299");
      return;
    }

    try {
      await placeOrder(user._id, cart);
      setCart([]);
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="animate-spin h-12 w-12 text-blue-600" />
        <span className="ml-3 text-gray-600">Loading your cart...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-gray-600 mb-6">Please login to view your cart</p>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Login Now
          </button>
        </div>
        {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
      </div>
    );
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Shopping Cart ({cart.length} items)
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Cart Items
            </h2>
            <div className="space-y-4">
              {cart.map((cartItem) => (
                <CartItem
                  key={`${cartItem.productId}-${cartItem.unit}`}
                  item={cartItem}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemove}
                  isUpdating={
                    updatingItem === `${cartItem.productId}-${cartItem.unit}`
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            itemCount={cart.length}
            onPlaceOrder={handlePlaceOrder}
            minOrderValue={299}
          />
        </div>
      </div>

      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default CartPage;
