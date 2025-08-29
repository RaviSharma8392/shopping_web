const express = require("express");
const { generatePdf, createOrder } = require("../../controller/orderController");
const order_router = express.Router();

// POST: create order
order_router.post("/create", createOrder);

// POST: generate PDF for an order
order_router.post("/pdf", generatePdf);





module.exports = order_router;
