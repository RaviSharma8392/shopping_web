import React, { useState } from "react";
import CartItem from "../../components/cartComponents/CartItem";
import OrderSummary from "../../components/cartComponents/OrderSummary";
import EmptyCart from "../../components/cartComponents/EmptyCart";
import { COLORS } from "../../style/theme";

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: "1",
      name: "Eirene Lawn Printed Navy Co-ord Set",
      image:
        "https://shopmulmul.com/cdn/shop/files/7_1bf47440-7b9c-479f-8982-e6ef21700b5f_800x.jpg",
      unit: "XS",
      price: 12950,
      quantity: 1,
    },
    {
      id: "2",
      name: "Aurora Printed Linen Off White Co-ord Set",
      image:
        "https://cdn.shopify.com/s/files/1/0088/4031/4931/files/188_20e089d1-7f04-4cb6-9042-7224655cd1f8.jpg",
      unit: "S",
      price: 9950,
      quantity: 2,
    },
  ]);

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-10"
      style={{ background: COLORS.accentAlt }}>
      <h1
        className="text-3xl font-playfair font-semibold mb-10 text-center md:text-left"
        style={{ color: COLORS.textAlt }}>
        Shopping Cart ({cart.length} items)
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div
          className="flex-1 rounded-xl shadow-md p-6"
          style={{ background: COLORS.light }}>
          <h2
            className="text-xl font-semibold mb-6"
            style={{ color: COLORS.primary }}>
            Cart Items
          </h2>

          <div className="space-y-6">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={updateQuantity}
                onRemove={removeItem}
                colors={COLORS}
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            itemCount={cart.length}
            colors={COLORS}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
