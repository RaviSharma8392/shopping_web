import React from "react";
// import { Bank } from "lucide-react";

export const PaymentNetBanking = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-full">
          {/* <Bank size={26} className="text-blue-600" /> */}
        </div>
        <h2 className="font-semibold text-xl text-gray-800">Netbanking</h2>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          You can pay using <span className="font-semibold">any bank</span>.
          After you place the order, we will send you the bank account details
          on your WhatsApp number for completing the payment.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-700">
          Your order will be marked as <strong>Pending</strong> until payment is
          completed.
        </p>
      </div>

      <p className="text-xs text-gray-500">
        Make sure your WhatsApp number is active for receiving payment details.
      </p>
    </div>
  );
};
