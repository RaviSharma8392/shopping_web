import React, { useState } from "react";
import PaymentOptions from "../code/payment/PaymentOptions";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useOrder } from "../hook/useOrders";
import Notification from "../../shared/components/Notification";
import CartSummary from "../code/cartComponents/CartSummary";

const PaymentPage = () => {
  const orderId = "ORD" + Date.now();

  const { user } = useAuth();
  const { cart, clear } = useCart();
  const { placeOrder } = useOrder();

  const [method, setMethod] = useState("upi");

  const [notification, setNotification] = useState({
    show: false,
    type: "info",
    message: "",
  });

  const showToast = (type, message) => {
    setNotification({ show: true, type, message });
  };

  const closeToast = () => setNotification({ show: false });

  const orderAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const upiId = "ravisharmabhimtal-2@okicici";

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!user) {
      showToast("error", "You must login to continue.");
      return;
    }

    const orderData = {
      orderId,
      userId: user.uid,
      paymentMethod: method,
      status: "pending",
      amount: orderAmount,
      deliveryCharges: 50,
      items: cart,
      address: user.address,
      customerName: user.name || "Customer",
      createdAt: Date.now(),
    };

    const res = await placeOrder(orderId, orderData);

    if (res.success) {
      try {
        await clear(user.uid);
      } catch (err) {
        console.log("Cart clear error", err);
      }

      showToast("success", "Order placed! Redirecting to WhatsApp…");

      const whatsappMessage = `
🧾 *New Order Request*
──────────────────────
👤 *Customer:* ${user.name || "Customer"}
📦 *Order ID:* ${orderId}
💳 *Payment:* ${method.toUpperCase()}
💰 *Amount:* ₹${orderAmount}
🚚 *Delivery:* ₹50
🟡 *Status:* Pending

📍 *Address:* ${user.address || "Not Provided"}
      `.trim();

      const phoneNumber = "91XXXXXXXXXX";
      window.location.href =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);
    } else {
      showToast("error", "Something went wrong. Try again.");
    }
  };

  return (
    <>
      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeToast}
        />
      )}

      {/* Desktop Layout */}
      <div className="hidden md:grid max-w-6xl mx-auto p-4 grid-cols-12 gap-6">
        {/* LEFT → Payment Options */}
        <div className="col-span-3">
          <PaymentOptions method={method} setMethod={setMethod} />
        </div>

        {/* RIGHT → Cart Summary */}
        <div className="col-span-9">
          <CartSummary
            subtotal={orderAmount}
            originalTotalPrice={orderAmount}
            platformFee={50}
            selectedItems={cart}
            onClick={handlePlaceOrder}
          />
        </div>
      </div>

      {/* MOBILE Layout */}
      <div className="md:hidden p-4 space-y-4">
        <PaymentOptions method={method} setMethod={setMethod} />
        <CartSummary
          subtotal={orderAmount}
          originalTotalPrice={orderAmount}
          platformFee={50}
          selectedItems={cart}
          onClick={handlePlaceOrder}
        />
      </div>
    </>
  );
};

export default PaymentPage;
