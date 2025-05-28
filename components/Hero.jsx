import { motion } from 'framer-motion'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";




const Hero = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        pauseOnHover: false,
      };
  return (
    <div className="max-w-6xl mx-auto my-6">
      <Slider {...settings}>
        {[
          { image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600", text: "Shop the latest trends" },
          { image: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600", text: "Discover new arrivals" },
          { image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=600", text: "Big discounts available" },
        ].map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.image} alt="Hero Slide" className="w-full rounded-lg shadow" />
            <div className="absolute inset-0 flex items-center justify-center bg-opacity-40">
              <h2 className="text-white text-3xl md:text-5xl font-bold animate-fadeIn">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Hero
