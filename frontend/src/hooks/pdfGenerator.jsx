// utils/pdfGenerator.js
import { api } from "../config";
import { toast } from "react-toastify";

export const generatePDF = async (order, userData) => {
  try {
    const res = await fetch(`${api}/order/pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order, user: userData }),
    });

    if (!res.ok) throw new Error("PDF generation failed");

    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Order_${order._id || Date.now()}.pdf`;
    link.click();
    return true;
  } catch (err) {
    toast.error("Failed to generate PDF");
    return false;
  }
};
