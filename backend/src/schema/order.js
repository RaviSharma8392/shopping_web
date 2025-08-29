const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "Item"
  },
  unit: { type: String },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number }, // price per unit
  totalPrice: { type: Number }, // quantity * price
});

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [CartItemSchema], // copy from Cart
    totalBill: { type: Number, required: true },
    paymentType: { type: String, enum: ["cash", "online"], default:"cash" },
    deliveryAddress: { type: String,  },
    message: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Pending Payment", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
