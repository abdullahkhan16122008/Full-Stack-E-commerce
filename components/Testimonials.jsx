import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialsSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
  };

  const testimonials = [
    {
      name: "Sarah Lee",
      text: "Absolutely love the products! Fast shipping and excellent quality.",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "David Kim",
      text: "Great customer service and seamless checkout process. Highly recommend!",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      name: "Emma Stone",
      text: "I always find the best deals here. The featured products are spot on!",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 mx-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 text-lg mb-4">“{testimonial.text}”</p>
              <h4 className="text-blue-600 font-semibold">- {testimonial.name}</h4>
            </motion.div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default TestimonialsSection;
