import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Replace with your logo URL or base64 image
const COMPANY_LOGO =
  "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png";

/**
 * Generates a full Amazon-style order PDF
 * @param {Object} order - Order object containing items, totals, etc.
 * @param {Object} user - User object containing name, email, phone, address
 */
export const generateOrderPDF = (order, user) => {
  const doc = new jsPDF("p", "mm", "a4");

  /** -------------------- HEADER -------------------- **/
  doc.addImage(COMPANY_LOGO, "SVG", 14, 10, 40, 15); // Amazon-style logo
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Your Order Summary", 14, 30);

  // Divider line
  doc.setDrawColor(200);
  doc.setLineWidth(0.5);
  doc.line(14, 32, 196, 32);

  /** -------------------- ORDER DETAILS -------------------- **/
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Order Details", 14, 38);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID: ${order._id || `ORD-${Date.now()}`}`, 14, 44);
  doc.text(`Order Date: ${new Date().toLocaleDateString("en-IN")}`, 14, 50);
  doc.text(
    `Payment Method: ${order.paymentType || "Cash on Delivery"}`,
    14,
    56
  );

  /** -------------------- SHIPPING DETAILS -------------------- **/
  doc.setFont("helvetica", "bold");
  doc.text("Shipping Address", 14, 64);
  doc.setFont("helvetica", "normal");
  doc.text(`${user.name}`, 14, 70);
  doc.text(`${user.address || "N/A"}`, 14, 76);
  doc.text(`${user.phone || "N/A"}`, 14, 82);
  doc.text(`${user.email}`, 14, 88);

  /** -------------------- ITEMS TABLE -------------------- **/
  autoTable(doc, {
    startY: 96,
    head: [["Item", "Qty", "Unit Price", "Total"]],
    body: order.items.map((item) => [
      item.productId?.name || item.name || "Product",
      item.quantity,
      `₹${(item.price || 0).toLocaleString("en-IN")}`,
      `₹${(item.totalPrice || item.quantity * (item.price || 0)).toLocaleString(
        "en-IN"
      )}`,
    ]),
    headStyles: {
      fillColor: [230, 230, 230],
      textColor: 0,
      fontStyle: "bold",
    },
    bodyStyles: { textColor: 0 },
    theme: "grid",
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 100, halign: "left" },
      1: { cellWidth: 20, halign: "center" },
      2: { cellWidth: 30, halign: "right" },
      3: { cellWidth: 30, halign: "right" },
    },
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  /** -------------------- ORDER SUMMARY -------------------- **/
  doc.setDrawColor(200);
  doc.setFillColor(249, 115, 22, 15); // light orange background
  doc.rect(14, finalY, 182, 30, "F"); // box around summary

  doc.setFont("helvetica", "bold");
  doc.text("Order Summary", 16, finalY + 7);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Subtotal: ₹${(order.subtotal || 0).toLocaleString("en-IN")}`,
    160,
    finalY + 7,
    { align: "right" }
  );
  doc.text(
    `Delivery Fee: ₹${(order.deliveryFee || 0).toLocaleString("en-IN")}`,
    160,
    finalY + 15,
    { align: "right" }
  );
  doc.setFont("helvetica", "bold");
  doc.text(
    `Total: ₹${(order.total || order.totalBill || 0).toLocaleString("en-IN")}`,
    160,
    finalY + 23,
    { align: "right" }
  );

  /** -------------------- FOOTER -------------------- **/
  const footerY = finalY + 45;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text("Thank you for shopping with us!", 105, footerY, {
    align: "center",
  });
  doc.text("For support, contact: support@shopease.com", 105, footerY + 6, {
    align: "center",
  });
  doc.text(
    "Terms & Conditions apply. Products are subject to availability.",
    105,
    footerY + 12,
    { align: "center" }
  );

  /** -------------------- SAVE PDF -------------------- **/
  const orderId = order._id || `ORD-${Date.now()}`;
  const fileName = `ShopEase_Order_${orderId}.pdf`;
  doc.save(fileName);

  return doc;
};
