const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
});

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    subcategories: [subcategorySchema], // <-- add this
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
