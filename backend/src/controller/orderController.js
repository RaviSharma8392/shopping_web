const Order = require("../schema/order");
const Cart = require("../schema/cart");
const Item = require("../schema/items"); // make sure the schema name is capitalized
const puppeteer = require("puppeteer");
const { generateFullOrderHTML } = require("../utils/pdfTemplates");


/**
 * Create a new order and clear the cart
 */
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      paymentType,
      deliveryAddress,
      message,
      customerName,
      email,
      phone,
    } = req.body;

    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    // Fetch item details from DB to get name & unit
   const validItems = await Promise.all(
  items.map(async (orderItem) => {
    const dbItem = await Item.findById(orderItem.productId);
    return {
      ...orderItem,
      name: dbItem?.name || orderItem.name || "Unnamed Product", // ensures name is present
      unit: orderItem.unit || "N/A", // you can add a default unit if needed
    };
  })
);

    const totalBill = validItems.reduce((acc, item) => acc + item.totalPrice, 0);

    const newOrder = new Order({
      userId,
      items: validItems,
      totalBill,
      paymentType,
      deliveryAddress: deliveryAddress || "123, MG Road, Bangalore",
      message: message || "",
      customerName: customerName || "N/A",
      email: email || "N/A",
      phone: phone || "N/A",
      status: paymentType === "online" ? "Pending Payment" : "Pending",
    });

    const savedOrder = await newOrder.save();

    // Clear user's cart
    await Cart.findOneAndUpdate({ userId }, { items: [], totalBill: 0 });

    res.status(201).json({ success: true, savedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const generatePdf = async (req, res) => {
  try {
    const { order, user } = req.body;

    // Fetch product names from DB based on productId in order.items
    const itemsWithNames = await Promise.all(
      order.items.map(async (orderItem) => {
        const dbItem = await Item.findById(orderItem.productId);
        return {
          ...orderItem,
          name: dbItem?.name || "Unnamed Product", // inject product name
          unit: orderItem.unit || "N/A",
        };
      })
    );

    // Replace order.items temporarily with itemsWithNames for PDF
    const orderForPDF = { ...order, items: itemsWithNames };

    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    const html = generateFullOrderHTML(orderForPDF, user);
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Order_${order._id || Date.now()}.pdf`
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("PDF generation failed");
  }
};

module.exports = { generatePdf ,createOrder};
