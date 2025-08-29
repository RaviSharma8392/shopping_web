const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: "Item" // reference to your product/item collection
  },
  unit: { 
    type: String, 
    // required: true 
  },
  quantity: { 
    type: Number, 
    required: true, 
    default: 1 
  },
  price: { // price for that unit at time of adding
    type: Number,
    // required: true,
  },
  totalPrice: { // quantity * price
    type: Number,
  },
});

const CartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    // required: true, 
    ref: "User" 
  },
  items: [CartItemSchema],
  totalBill: { // total cart value
    type: String,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
