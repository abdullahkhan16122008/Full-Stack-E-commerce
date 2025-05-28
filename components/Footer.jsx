import React from 'react'



function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-200 py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4">eShop</h3>
            <p className="text-sm text-gray-400">Your trusted destination for quality products and the best shopping experience. Thank you for choosing us!</p>
          </div>
  
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Order Tracking</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest deals and updates right to your inbox.</p>
            <form className="flex flex-col sm:flex-row items-center gap-2">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-md text-gray-900 focus:outline-none w-full sm:w-auto" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} eShop. All rights reserved.
        </div>
      </footer>
    );
  }
  
  
export default Footer;