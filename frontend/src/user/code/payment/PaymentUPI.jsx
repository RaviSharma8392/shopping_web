import QRCode from "qrcode";
import { useEffect, useState } from "react";

export const PaymentUPI = ({ upiId, amount, orderId, userName }) => {
  const [qrImage, setQrImage] = useState("");

  const upiURL = `upi://pay?pa=${upiId}&pn=${userName}&am=${amount}&cu=INR&tn=Order%20${orderId}`;

  useEffect(() => {
    QRCode.toDataURL(upiURL)
      .then((url) => setQrImage(url))
      .catch((err) => console.log(err));
  }, [upiURL]);

  return (
    <div className="text-center space-y-3">
      <h2 className="font-bold text-xl">UPI Payment</h2>

      <img
        src={qrImage}
        alt="UPI QR"
        className="w-56 mx-auto rounded-xl shadow-md"
      />

      <p className="text-sm">
        UPI ID: <b>{upiId}</b>
      </p>
      <p className="text-sm text-gray-600">Amount: ₹{amount}</p>

      <button
        onClick={() => (window.location.href = upiURL)}
        className="mt-3 bg-pink-600 text-white px-4 py-2 rounded-lg w-full">
        Pay using UPI App
      </button>

      {/* IMPORTANT NOTE */}
      <div className="mt-3 bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded text-sm">
        📌 <b>Important:</b> After completing the payment, please share your
        payment screenshot on WhatsApp so your order can be verified.
      </div>
    </div>
  );
};
