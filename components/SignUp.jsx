import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';



const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });


  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    const { credential } = credentialResponse;

    try {
      const response = await fetch('https://ecom-backend.onrender.com/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });

      const result = await response.json();
      if (result.success) {
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
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpData;

    if (!name || !email || !password) {
      alert('Please fill the form');
      return;
    }

    try {
      const response = await fetch('https://ecom-backend.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpData)
      });

      const result = await response.json();

      if (result) {

        if(signUpData.role === 'user'){
          alert('Signup successful! You can now login.');
          navigate('/home');
    }
    else if(signUpData.role === 'admin'){
        alert('Signup successful! You can now login.');
        navigate('/admin-dashboard');
      }
      else {
        alert(result.message || 'Signup failed');
      }
      console.log(signUpData.role)
    }
    } catch (err) {
      console.error(err);
      alert('Server Issue');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-green-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center text-green-700 mb-8">Create Account</h2>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Name</label>
            <input
              onChange={handleChange}
              value={signUpData.name}
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              value={signUpData.email}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              value={signUpData.password}
            />
          </div>
          <div className='flex'>
            <label className="text-gray-700 font-semibold" name="user">User</label>
            <input
              type="radio"
              onChange={handleChange}
              // ref={ref}
              name="role"
              id='role'
              value="user"
              checked={signUpData.role === 'user'}
              className="mx-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            />
            <label className="text-gray-700 font-semibold" name="admin">Seller</label>
            <input
              type="radio"
              onChange={handleChange}
              name="role"
              id='role'
              value="admin"
              checked={signUpData.role === 'admin'}
              className="mx-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transform hover:scale-105 transition duration-300 font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/" className="text-green-700 font-semibold hover:underline">Login</Link>
        </p>

        <div className="mt-6">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
