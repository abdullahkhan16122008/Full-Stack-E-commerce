import { useState } from "react";
import { motion } from "framer-motion";
import { FaCcPaypal, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useCart } from "../src/context api/CartContext";
import axios from "axios";
import Navbar from "./Navbar";
import {loadStripe} from '@stripe/stripe-js';





export default function CheckoutPage() {
  const { cart, setCart, product, setProduct } = useCart()
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "paypal",
    productId: "",
    productName: "",
    productPrice: "",
    productQuantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

     const orderData = {
    ...form,
    productId: localStorage.getItem("product id"),
    productName: localStorage.getItem("product name"),
    productPrice: localStorage.getItem("product price"),
    productQuantity: localStorage.getItem("cart quantity"),
  };

  if (form.paymentMethod === "stripe") {
    const stripe = await stripePromise;
    const response = await axios.post('https://mern-stack-e-commerce-2lqn.onrender.com/api/stripe/create-checkout-session', {
      productName: orderData.productName,
      productPrice: orderData.productPrice,
      productQuantity: orderData.productQuantity,
    });

    const session = response.data;
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error(result.error.message);
    }
  } else {
    try {
      await axios.post('https://mern-stack-e-commerce-2lqn.onrender.com/api/checkout', orderData);
      alert("Order placed successfully!");
      // Optionally: clear form or redirect
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Order failed!");
    }
  }
    
    form.productId = localStorage.getItem("product id");
    form.productName = localStorage.getItem("product name");
    form.productPrice = localStorage.getItem("product price");
    form.productQuantity = localStorage.getItem("cart quantity");
    alert("Order placed successfully!");
    let details = await axios.post('https://mern-stack-e-commerce-2lqn.onrender.com/api/checkout', form).then(response => {
      console.log(response.data)
    })
    // Implement your logic to handle checkout
  };
  
//   const handleStripePayment = async () => {
//   const stripe = await stripePromise;

//   const response = await axios.post('http://localhost:3000/api/stripe/create-checkout-session', {
//     productName: form.productName,
//     productPrice: form.productPrice,
//     productQuantity: form.productQuantity,
//   });

//   const session = response.data;
//   const result = await stripe.redirectToCheckout({
//     sessionId: session.id,
//   });

//   if (result.error) {
//     console.error(result.error.message);
//   }
// };

  return (
    <>
    <Navbar />
    <motion.div 
      className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-2xl rounded-3xl"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Checkout</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-xl shadow-sm focus:outline-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 mt-4 border rounded-xl shadow-sm focus:outline-blue-500"
            required
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Street Address"
            className="w-full p-3 mt-4 border rounded-xl shadow-sm focus:outline-blue-500"
            required
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="p-3 border rounded-xl shadow-sm focus:outline-blue-500"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="p-3 border rounded-xl shadow-sm focus:outline-blue-500"
              required
            />
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold text-gray-700">Payment Method</h3>
          {/* <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={form.paymentMethod === "paypal"}
              onChange={handleChange}
            />
            <FaCcPaypal className="text-xl text-blue-700" /> PayPal
          </label> */}

          <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={form.paymentMethod === "stripe"}
              onChange={handleChange}
            />
            <FaCreditCard className="text-xl text-purple-700" /> Stripe
          </label>

          <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-100">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={handleChange}
            />
            <FaMoneyBillWave className="text-xl text-green-700" /> Cash on Delivery
          </label>

          <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl mt-6 font-semibold hover:bg-blue-700 transition"
          >
          Place Order
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
    </>
  );
}
