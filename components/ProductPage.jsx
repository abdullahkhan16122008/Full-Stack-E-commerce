import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../src/context api/CartContext";
import Navbar from "./Navbar";



function ProductPage() {
  let { cart, setCart, product, setProduct } = useCart()
  // const { id } = useParams();

    let cartData = {
    _id: localStorage.getItem("product id"),
      name: localStorage.getItem("product name"),
      image: localStorage.getItem("product image"),
      price: localStorage.getItem("product price"),
      category: localStorage.getItem("product category"),
      quantity: 1,
  }

  
  let productDetails = { 
    productId: localStorage.getItem("product id"),
    productName: localStorage.getItem("product name"),
    productPrice: localStorage.getItem("product price"),
    productImage: localStorage.getItem("product image"),
    productRating: localStorage.getItem("product rating"),
    productDescription: localStorage.getItem("product description"),
    productAvailable: localStorage.getItem("product available"),
    productCategory: localStorage.getItem("product category"),
  }
  
  let navigate = useNavigate()

  // useEffect(() => {
      const handleAddToCart = () => {
      // await axios.post(`http://localhost:3000/api/cart`)
      //   .then(res => setProduct(res.data))
      //   .catch(err => console.error(err));
      // let id = localStorage.setItem(productDetails.productId)
      // let name = localStorage.setItem(productDetails.productName)
      // let Price = localStorage.setItem(productDetails.productPrice)
      // let Image = localStorage.setItem(productDetails.productImage)
      navigate('/cart')
      // setCartSave([{
      //   productEmail: localStorage.getItem("userEmail"),
      //   _id: localStorage.setItem("cart id", cartData._id),
      //   name: localStorage.setItem("cart name", cartData.name),
      //   image: localStorage.setItem("cart image", cartData.image),
      //   price: localStorage.setItem("cart price", cartData.price),
      //   category: localStorage.setItem("cart category", cartData.category),
      //   quantity: localStorage.setItem("cart quantity", cartData.quantity),
      // }])
      setCart([{
        productEmail: localStorage.getItem("userEmail"),
        _id: cartData._id,
        name: cartData.name,
        image: cartData.image,
        price: cartData.price,
        category: cartData.category,
        quantity: cartData.quantity,
      }])
      }
      console.log(cart)
    // }, []);
    

  // if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
    <Navbar />
    <div className="max-w-5xl mx-auto py-10 grid md:grid-cols-2 gap-10">
      <img src={productDetails.productImage} alt={productDetails.productName} className="w-full h-auto rounded-xl shadow" />
      <div>
        <h1 className="text-3xl font-bold">{productDetails.productName}</h1>
        <p className="text-xl text-blue-600 mt-2">${productDetails.productPrice}</p>
        <p className="mt-4 text-gray-700">{productDetails.productDescription}</p>
        <p className="mt-2">Rating: ⭐ {productDetails.productRating}</p>
        <p className="mt-1">Availability: {productDetails.productAvailable ? 'In Stock' : 'Out of Stock'}</p>
        <button
        onClick={()=>{
          handleAddToCart()
          alert('product added successfully')
        }}
        className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700 transition"
      >
        Add to Cart
      </button>
      </div>
    </div>
    </>
  );
}

export default ProductPage;
