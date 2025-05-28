import { motion } from 'framer-motion';
import React from 'react'


const AboutSection = () => {
    return (
        <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              At eShop, we are passionate about delivering the best online shopping experience. From cutting-edge electronics to trendy accessories, our mission is to offer quality, affordability, and fast delivery to every customer. Your satisfaction is our top priority.
            </motion.p>
          </div>
        </section>
      );
}

export default AboutSection;
