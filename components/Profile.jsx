import { motion } from 'framer-motion';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import Navbar from './Navbar';


const Profile = () => {
  const [loggedInUser, setloggedInUser] = useState({
    userName: "",
    userEmail: ""
  })
  let navigate = useNavigate()
  let handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    googleLogout()
    navigate('/')
  }
  
  
  useEffect(()=>{
    setloggedInUser({
      userName: localStorage.getItem("loggedInUser"),
      userEmail: localStorage.getItem("userEmail")
    })
  },[])

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
        My Profile
      </motion.h2>
      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={`${loggedInUser.userName}`}
            disabled
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue={`${loggedInUser.userEmail}`}
            disabled
          />
        </div>
        <button onClick={handleLogout} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300">
          Log out
        </button>
      </div>
    </div>
    </>
  )
}

export default Profile;
