import mongoose from 'mongoose'

export const Cart = mongoose.model('Cart', new mongoose.Schema({
  productEmail: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productCategory: { type: String, required: true },
  productImage: { type: String },
}, { timestamps: true }
));
