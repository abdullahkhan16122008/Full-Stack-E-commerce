import './App.css'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Cart from '../components/Cart'
import Profile from '../components/Profile';
import Checkout from '../components/Checkout'
import ProductList from '../components/ProductList'
import ProductPage from '../components/ProductPage';
import AddProduct from './pages/AddProducts';
import AdminDashboard from './pages/AdminDashboard';
import OrderTracking from '../components/OrderTracking';
import AdminOrdersPage from './pages/Orders';
import Users from './pages/Users';





function App() {
  return (
        <Router>
    <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* <Route path="/admin-dashboard/users" element={<Users />} /> */}
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-dashboard/orders" element={<AdminOrdersPage />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;