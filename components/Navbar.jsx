import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  
  let handleUserDhitaiCart = () => {
    let navigate = useNavigate()
    let findLocal = localStorage.getItem('token')
    if (!findLocal == '' || null || undefined) {
      navigate('/cart')
    }
    if (findLocal == '' || null || undefined) {
      navigate('/')
    }
  }


  let handleUserDhitaiProfile = () => {
    let navigate = useNavigate()
    let findLocal = localStorage.getItem('token')
    if (!findLocal == '' || null || undefined) {
      navigate('/products')
    }
    if (findLocal == '' || null || undefined) {
      navigate('/')
    }
  }


  let handleUserDhitaiProducts = () => {
    let navigate = useNavigate()
    let findLocal = localStorage.getItem('token')
    if (!findLocal == '' || null || undefined) {
      navigate('/profile')
    }
    if (findLocal == '' || null || undefined) {
      navigate('/')
    }
  }
    let onLogOut = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userRole")
    localStorage.removeItem("token")
    navigate('/')
  }

  return (
    <div>
        <nav className="bg-white p-4 shadow flex justify-between items-center sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition duration-300">eShop</Link>
      <div className="space-x-4 text-sm">
        <Link to="/products" className="hover:underline" onClick={handleUserDhitaiProducts}>Products</Link>
        <Link to="/cart" className="hover:underline" onClick={handleUserDhitaiCart}>Cart</Link>
        <Link to="/profile" className="hover:underline" onClick={handleUserDhitaiProfile}>Profile</Link>
        <Link to="/order-tracking" className="hover:underline" onClick={handleUserDhitaiProfile}>Track Order</Link>
        <Link to="/" className="hover:underline" onClick={()=>{onLogOut()}}>Logout</Link>
        {/* <Link to="/login" className="hover:underline">Login</Link> */}
      </div>
    </nav>
      
    </div>
  )
}

export default Navbar;