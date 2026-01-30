import React from "react";
import { CheckCircle2, Smartphone, X } from "lucide-react";

const PaymentConfirmationPopup = ({ visible, onClose, whatsappNumber }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {/* TOP-RIGHT CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={20} />
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center text-center gap-3">
          <CheckCircle2 size={40} className="text-emerald-500" />
          <h2 className="text-lg font-bold text-gray-900">
            Your order is placed!
          </h2>
          <p className="text-sm text-gray-600">
            We are messaging you on WhatsApp to confirm your payment. Currently,
            we only accept payments via WhatsApp.
          </p>
        </div>

        {/* WHATSAPP INFO */}
        <div
          className="mt-6 group flex items-center justify-between bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 rounded-lg px-4 py-3 cursor-pointer transition-all"
          onClick={() => navigator.clipboard.writeText(whatsappNumber)}>
          <div className="flex items-center gap-3">
            <Smartphone
              size={20}
              className="text-gray-400 group-hover:text-emerald-600"
            />
            <span className="text-lg font-mono font-bold text-gray-800 group-hover:text-emerald-800">
              +91 {whatsappNumber}
            </span>
          </div>
          <div className="text-xs font-medium text-gray-500 group-hover:text-emerald-600">
            Click to copy
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Please ensure the payment comes from this official number to avoid
          fraud.
        </p>

        {/* BOTTOM CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-transform active:scale-[0.98]">
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmationPopup;
