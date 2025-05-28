import mongoose from 'mongoose'

export const Product = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  available: { type: Boolean, default: true },
  category: { type: String, required: true },
  image: { type: String },
  description: { type: String },
}, { timestamps: true }
));
