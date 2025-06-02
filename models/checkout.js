import mongoose, { SchemaType } from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model('order', orderSchema);

export default order;
