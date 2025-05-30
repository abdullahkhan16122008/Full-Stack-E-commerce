import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react'
import { useCart } from '../src/context api/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';




const Cart = () => {
  
  const { cart, setCart, product, setProduct } = useCart()
  let navigate = useNavigate()

  let cartData = {
    _id: localStorage.getItem("product id"),
      name: localStorage.getItem("product name"),
      image: localStorage.getItem("product image"),
      price: localStorage.getItem("product price"),
      category: localStorage.getItem("product category"),
  }
  // const [cart, setCart] = useState([
  //   {
  //     productEmail: localStorage.getItem("userEmail"),
  //     _id: localStorage.getItem("product id"),
  //     name: localStorage.getItem("product name"),
  //     image: localStorage.getItem("product image"),
  //     price: localStorage.getItem("product price"),
  //     category: localStorage.getItem("product category"),
  //   }
  // ])
  const [cartSave, setCartSave] = useState([
    {
      productEmail: localStorage.getItem("userEmail"),
      _id: localStorage.getItem("cart id"),
      name: localStorage.getItem("cart name"),
      image: localStorage.getItem("cart image"),
      price: localStorage.getItem("cart price"),
      category: localStorage.getItem("cart category"),
      quantity: 1,
    }
  ])
  useEffect(()=>{
    axios.post('https://ecom-backend.onrender.com/api/products/api/cart',cartSave)
  },[])
  console.log(cartSave)

  let handleDelete = () => {
    setCartSave([{
      _id: localStorage.removeItem("cart id"),
      name: localStorage.removeItem("cart name"),
      image: localStorage.removeItem("cart image"),
      price: localStorage.removeItem("cart price"),
      category: localStorage.removeItem("cart category"),
      quantity: null,
    }])
  }

  let handleCheckout = () => {
    let cartData = {
      id: cart._id,
      name: cart.name,
      price: cart.price,
      category: cart.category,
      quantity: cart.quantity,
    }
    setProduct(cartData)
    navigate('/checkout')
  }

  

  return (
    <>
    <Navbar />
    <div className="p-6">
      <motion.h2
        className="text-2xl font-semibold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Cart
      </motion.h2>
      <div className="bg-white rounded-xl overflow-auto p-4 shadow">
        {/* <p className="text-gray-700">Cart items will appear here.</p> */}
          {cart.map((item) => (
        <table border={1} className='border-1'>
          <tr className='justify-around'>
            <th className='px-10 border-1 py-3'>Product</th>
            <th className='px-10 border-1 py-3'>Price</th>
            <th className='px-10 border-1 py-3'>Category</th>
            <th className='px-10 border-1 py-3'>Quantity</th>
            <th className='px-10 border-1 py-3'>Delete</th>
          </tr>

          <tr className={`justify-around`} key={item._id}>
            <td className='px-27 py-3 justify-center flex items-center'><img src={`${item.image}`} className='h-[64px]' alt="" />{item.name}</td>
            <td className='px-27 border-x-1 py-3 hidden'>{item.id}</td>
            <td className='px-27 border-x-1 py-3'>{item.price}</td>
            <td className='px-27 py-3'>{item.category}</td>
            <td className='px-27 border-x-1 py-3'><input type="number" name="" value={item.quantity} className='text-center' id="" /></td>
            <td className={`px-27 border-1 py-3`}><button className='cursor-pointer border px-[12px] py-[5px]' onClick={()=>{
              handleDelete();
              }}>Delete</button></td>
          </tr>
        </table>
          ))}
          <button
        onClick={()=>{
          handleCheckout()
        }}
        className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 transition"
      >
        Checkout
      </button>
      </div>
    </div>
    </>
  )
}

export default Cart;
