const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  unit: { type: String, required: true }, 
  price: { type: Number, required: true },
});

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category",
      required: true,
    },

    subcategory: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category.subcategories", 
      default: null,
    },

    description: { type: String, required: true },

    coverImage: { type: String, required: true },

    additionalImages: { type: [String], default: [] },

    price: { type: [priceSchema], default: [] },

    isActive: { type: Boolean, default: true },
isBestSeller: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
