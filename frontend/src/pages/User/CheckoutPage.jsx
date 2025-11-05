import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertCircle, CheckCircle } from "lucide-react";

import { useCart } from "../../hooks/useCart";
import { generatePDF } from "../../hooks/pdfGenerator";
import { OrderService } from "../../services/api/OrderService";
import { CartService } from "../../services/cartService";

import LoginRequired from "../../components/checkout.jsx/LoginRequired";
import ShippingDetails from "../../components/checkout.jsx/ShippingDetails";
import CustomerNote from "../../components/checkout.jsx/CustomerNote";
import PaymentMethod from "../../components/checkout.jsx/PaymentMethod";
import OrderSummary from "../../components/ui/summary/OrderSummary";
import ReceiptButtons from "../../components/ui/buttons/ReceiptButtons";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const { cart, subtotal, setCart } = useCart(user._id, navigate);
  const [deliveryFee] = useState(50);
  const [paymentType, setPaymentType] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerNote, setCustomerNote] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const deliveryAddress = user.address || "123, MG Road, Bangalore";

  const total = subtotal + deliveryFee;

  // ✅ Place order
  const handlePlaceOrder = async () => {
    if (!user._id) return navigate("/login");
    if (!cart.length) return toast.error("Your cart is empty!");
    if (subtotal < 299) return toast.error("Minimum order value is ₹299");
    if (paymentType === "online")
      return setFormErrors({ payment: "Online payment coming soon" });

    try {
      setLoading(true);

      const orderData = {
        userId: user._id,
        items: cart.map((i) => ({
          productId: i.productId,
          unit: i.unit,
          quantity: i.quantity,
          price: i.price || 0,
          totalPrice: i.totalPrice || 0,
        })),
        totalBill: total,
        paymentType,
        deliveryAddress,
        message: customerNote,
        customerName: user.name,
        email: user.email,
        phone: user.phone || "N/A",
      };

      const savedOrder = await OrderService.createOrder(orderData);

      const fullOrder = {
        ...savedOrder,
        subtotal,
        deliveryFee,
        total,
        paymentType,
      };
      setOrderDetails(fullOrder);

      const pdfSuccess = await generatePDF(fullOrder, user);
      if (pdfSuccess) {
        await CartService.clearCart(user._id);
        setCart([]); // clear local state
        toast.success(
          <div className="flex items-center">
            <CheckCircle className="mr-2 text-green-500" size={20} />
            Order placed successfully! PDF downloaded.
          </div>
        );
      }
    } catch (err) {
      toast.error(
        <div className="flex items-center">
          <AlertCircle className="mr-2 text-red-500" size={20} />
          {err.message || "Order failed"}
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user._id) return <LoginRequired navigate={navigate} />;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600">
            Review your order and complete purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-6">
            <ShippingDetails
              user={user}
              deliveryAddress={deliveryAddress}
              formErrors={formErrors}
              navigate={navigate}
            />
            <CustomerNote
              customerNote={customerNote}
              setCustomerNote={setCustomerNote}
            />
            <PaymentMethod
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              formErrors={formErrors}
            />
          </div>

          {/* RIGHT */}
          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            handlePlaceOrder={handlePlaceOrder}
            loading={loading}
          />

          {orderDetails && (
            <ReceiptButtons
              generatePDF={() => generatePDF(orderDetails, user)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
