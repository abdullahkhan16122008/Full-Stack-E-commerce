import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Hero from './Hero'
import FeaturedProduct from './FeaturedProduct'
import AboutSection from './AboutSection'
import TestimonialsSection from './Testimonials'
import ProductsSection from './ProductsSection'
import Footer from './Footer'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
            <Navbar />
    <Hero />
    <div className="p-6 text-center">
      <motion.h1
        className="text-4xl font-bold text-blue-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to the eShop
      </motion.h1>
      <FeaturedProduct />
      <AboutSection />
      <TestimonialsSection />
      {/* <ProductsSection /> */}
      <Footer />
    </div>
    </>
  )
}

export default Home
