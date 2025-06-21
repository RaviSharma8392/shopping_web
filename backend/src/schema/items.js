const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Shirt", "Pant", "Shoes", "Sports Gear", "Other"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  additionalImages: {
    type: [String], 
    default: [],
  },
}, 
{ timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
