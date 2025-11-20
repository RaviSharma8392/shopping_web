import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IMAGES } from "../../../assets/images";

const HeroBanner = () => {
  const desktopSlides = [
    IMAGES.desktopImage1,
    IMAGES.desktopImage2,
    IMAGES.desktopImage3,
  ];

  const mobileSlides = [
    IMAGES.mobileImage1,
    IMAGES.mobileImage2,
    IMAGES.mobileImage3,
  ];

  const isMobile = window.innerWidth < 768;
  const slides = isMobile ? mobileSlides : desktopSlides;

  const [index, setIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div
      className="relative  w-full overflow-hidden"
      style={{
        height: isMobile ? "100vh" : "100vh",
      }}>
      {/* Slides */}
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="Hero Slide"
          className={`
            hero-banner-img
            absolute inset-0 w-full h-full object-cover md:object-contain
            transition-opacity duration-[1200ms] ease-out
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}
    </div>
  );
};

export default HeroBanner;
