import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from './Navbar';


const Login = () => {

  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()


  
  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse
    
    try {
      const response = await fetch('https://full-stack-e-commerce-gd4t.onrender.com/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });

      const result = await response.json();
      if (result) {
        // Save token to localStorage and navigate to home page
        localStorage.setItem('token', result.jwtToken);
        localStorage.setItem('loggedInUser', result.name);
        localStorage.setItem('userEmail', result.email);
        navigate('/home');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      alert('Server issue');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      alert('Please fill the form');
      return;
    }

    try {
      const response = await fetch('https://full-stack-e-commerce-gd4t.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name, email, role } = result
      if (result.success) {
        alert('Login successful!');
        localStorage.setItem('token', jwtToken)
        localStorage.setItem('loggedInUser', name)
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userRole', role)

        if(role == 'user') {
          navigate('/home')
        }
        else if(role == 'admin') {
          navigate('/admin-dashboard')
        }
      } else {
        alert(result.messege || 'Signup failed');
      }
    } catch (err) {
      alert('Server Issue');
    }
  };


  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-8">Welcome Back</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input
              name="email"
              onChange={handleChange}
              value={loginInfo.email}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Password</label>
            <input
              name='password'
              onChange={handleChange}
              value={loginInfo.password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300 font-medium"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account? <Link to="/signup" className="text-blue-700 font-semibold hover:underline">Sign up</Link>
        </p>
        <div className="mt-6">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                  />
                </div>
      </motion.div>
    </div>
    </>
  )
}

export default Login
