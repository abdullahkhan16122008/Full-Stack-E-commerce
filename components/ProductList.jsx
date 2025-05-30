import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useCart } from "../src/context api/CartContext";
import Navbar from "./Navbar";



const categories = ["All", "Electronics", "Fashion", "Home Appliances"];

function ProductListPage() {
 
  const {cart, setCart} = useCart() 
  const [products, setProducts] = useState([])
  
  useEffect(()=>{
    try {
      axios.post(`https://full-stack-e-commerce-gd4t.onrender.com/api/productlist`).then((response)=>{
        setProducts(response.data)
      })
    } catch (err) {
      console.log(err)
    }
  },[])

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(0);
  const [available, setavailable] = useState("all");

const filteredProducts = products.filter((product) => {
  const inCategory = category === "All" || product.category === category;
  const inPriceRange = product.price >= minPrice && product.price <= maxPrice;
  const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
  const matchesRating = product.rating >= rating;
  const matchesavailable = available === "all" || product.available === (available === "available");
  return inCategory && inPriceRange && matchesSearch && matchesRating && matchesavailable;
});


  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

      {/* Filters */}
      <div className="grid md:grid-cols-5 gap-4 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded col-span-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border p-2 rounded"
        />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-2 rounded">
          <option value={0}>All Ratings</option>
          <option value={4}>4 & up</option>
          <option value={4.5}>4.5 & up</option>
        </select>
        <select value={available} onChange={(e) => setavailable(e.target.value)} className="border p-2 rounded">
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} onClick={()=>{
            localStorage.setItem('product id', product._id)
            setCart([{
              _id: product.id,
              name: product.name,
            }])  
            localStorage.setItem('product name', product.name)  
            localStorage.setItem('product rating', product.rating)  
            localStorage.setItem('product price', product.price)  
            localStorage.setItem('product available', product.available)  
            localStorage.setItem('product category', product.category)  
            localStorage.setItem('product description', product.description)  
            localStorage.setItem('product image', product.image)  
          }} className="block border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-blue-600 font-medium mt-1">${product.price}</p>
              <p className="text-sm text-gray-500">Rating: {product.rating} ⭐</p>
              <p className="text-sm text-gray-500">{product.available ? "In Stock" : "Out of Stock"}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
            </>
  );
}

export default ProductListPage;

