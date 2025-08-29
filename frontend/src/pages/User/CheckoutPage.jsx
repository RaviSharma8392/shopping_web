import React, { useState, useEffect } from "react";
import { CartService } from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import {
  Loader,
  Download,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  Wallet,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../config/config";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(50);
  const [paymentType, setPaymentType] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [customerNote, setCustomerNote] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const deliveryAddress = user.address || "123, MG Road, Bangalore";

  useEffect(() => {
    const fetchCart = async () => {
      if (!user._id) {
        navigate("/login");
        return;
      }
      try {
        const data = await CartService.getCart(user._id);
        setCart(data.items || []);
        setSubtotal(data.totalBill || 0);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        toast.error("Failed to load cart items");
      }
    };
    fetchCart();
  }, [user._id, navigate]);

  const total = subtotal + deliveryFee;

  // Function to generate PDF via backend
  const generatePDFViaBackend = async (order, userData) => {
    try {
      const response = await fetch(`${api}/order/pdf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order, user: userData }),
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      // Create blob from response
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const orderId = order._id || `ORD-${Date.now()}`;
      link.download = `Order_${orderId}.pdf`;

      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      return true;
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
      return false;
    }
  };

  const validateForm = () => {
    const errors = {};

    // if (!user.address) {
    //   errors.address = "Please add a delivery address in your profile";
    // }

    if (paymentType === "online") {
      errors.payment = "Online payment integration coming soon";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (!user._id) {
      navigate("/login");
      return;
    }

    if (!cart.length) {
      toast.error("Your cart is empty!");
      return;
    }

    if (subtotal < 299) {
      toast.error("Minimum order value is ₹299");
      return;
    }

    try {
      setLoading(true);

      // Prepare order data according to your backend schema
      const orderData = {
        userId: user._id,
        items: cart.map((item) => ({
          productId: item.productId,
          unit: item.unit,
          quantity: item.quantity,
          price: item.price || 0,
          totalPrice: item.totalPrice || 0,
        })),
        totalBill: total,
        paymentType,
        deliveryAddress,
        message: customerNote,
        customerName: user.name,
        email: user.email,
        phone: user.phone || "N/A",
      };

      // Send order to backend
      const response = await fetch(`${api}/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to place order");
      }

      if (!result.success) {
        throw new Error(result.message || "Order creation failed");
      }

      const savedOrder = result.savedOrder;

      // Store order details for PDF generation
      const orderWithDetails = {
        ...savedOrder,
        subtotal,
        deliveryFee,
        total,
        paymentType,
      };

      setOrderDetails(orderWithDetails);

      // Generate PDF via backend
      const pdfSuccess = await generatePDFViaBackend(orderWithDetails, user);

      if (pdfSuccess) {
        // Clear cart after successful order
        await CartService.clearCart(user._id);

        toast.success(
          <div className="flex items-center">
            <CheckCircle className="mr-2 text-green-500" size={20} />
            Order placed successfully! PDF downloaded.
          </div>
        );
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(
        <div className="flex items-center">
          <AlertCircle className="mr-2 text-red-500" size={20} />
          {error.message || "Failed to place order. Please try again!"}
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (orderDetails) {
      await generatePDFViaBackend(orderDetails, user);
    }
  };

  const handleAddAddress = () => {
    navigate("/profile?tab=address");
  };

  if (!user._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
            <AlertCircle className="mx-auto text-orange-500 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to proceed with checkout
            </p>
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Login Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Order Details */}
          <div className="space-y-6">
            {/* Shipping Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="mr-2" size={20} />
                Shipping Details
              </h2>

              {formErrors.address && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-700 text-sm flex items-center">
                    <AlertCircle className="mr-2" size={16} />
                    {formErrors.address}
                  </p>
                </div>
              )}

              <div className="space-y-2 text-gray-700">
                <p className="font-medium">{user.name}</p>
                <p className="flex items-center">
                  <Mail className="mr-2" size={16} />
                  {user.email}
                </p>
                {user.phone && (
                  <p className="flex items-center">
                    <Phone className="mr-2" size={16} />
                    {user.phone}
                  </p>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <MapPin className="mr-2 mt-1" size={16} />
                    <span className={!user.address ? "text-red-500" : ""}>
                      {deliveryAddress}
                    </span>
                  </div>
                  <button
                    onClick={handleAddAddress}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium ml-2">
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Note */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Delivery Instructions (Optional)
              </h2>
              <textarea
                placeholder="Add special delivery instructions, gate code, or other notes..."
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Method
              </h2>

              {formErrors.payment && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <p className="text-yellow-700 text-sm flex items-center">
                    <AlertCircle className="mr-2" size={16} />
                    {formErrors.payment}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentType === "cash"}
                    onChange={() => setPaymentType("cash")}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                  />
                  <Wallet className="ml-3 mr-2" size={20} />
                  <span className="font-medium">Cash on Delivery</span>
                </label>

                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 transition-colors opacity-60">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentType === "online"}
                    onChange={() => setPaymentType("online")}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                    disabled
                  />
                  <CreditCard className="ml-3 mr-2" size={20} />
                  <span className="font-medium">Online Payment</span>
                  <span className="ml-2 text-sm text-gray-500">
                    (Coming Soon)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {item.productId?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.unit} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ₹{item.totalPrice?.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">
                  ₹{deliveryFee.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                <span>Total Amount</span>
                <span className="text-orange-600">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Minimum Order Notice */}
            {subtotal > 0 && subtotal < 299 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <p className="text-yellow-700 text-sm flex items-center">
                  <AlertCircle className="mr-2" size={16} />
                  Minimum order value is ₹299. Add more items to proceed.
                </p>
              </div>
            )}

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0 || subtotal < 299}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6 flex items-center justify-center">
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Processing Order...
                </>
              ) : (
                `Place Order - ₹${total.toLocaleString("en-IN")}`
              )}
            </button>

            {/* Download PDF Button (shown after order placement) */}
            {orderDetails && (
              <button
                onClick={handleDownloadPDF}
                className="w-full border border-orange-500 text-orange-500 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors mt-4 flex items-center justify-center">
                <Download className="mr-2" size={20} />
                Download Receipt Again
              </button>
            )}

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-500 mt-4">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
