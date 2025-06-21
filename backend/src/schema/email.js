const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    lowercase: true,
    trim: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('EmailEntry', emailSchema);
