const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true }, // the product being reviewed
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // user who wrote the review

    rating: { type: Number, required: true, min: 1, max: 5 }, // 1-5 stars
    title: { type: String, default: "" }, // optional short title
    comment: { type: String, required: true }, // full review text

    likes: { type: Number, default: 0 }, // number of likes/upvotes
    replies: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    isVerifiedPurchase: { type: Boolean, default: false }, // true if user bought product
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // moderation
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
