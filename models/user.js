import mongoose from "mongoose";

const signUpSchema = new mongoose.Schema(
  {
    name: {
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const signUp = mongoose.model('User', signUpSchema);

export default signUp;
