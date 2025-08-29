import React, { useState, useEffect } from "react";

const HeroBanner = () => {
  const images = [
    {
      url: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/12dcd646940de386.jpeg?q=60",
    },
    {
      url: "https://rukminim1.flixcart.com/fk-p-flap/3240/540/image/841cfd128694775a.jpeg?q=60",
    },
    {
      url: "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Priya/S24/D109961859_IN_WLD_Samsung_S24-_LaunchPC_Hero_3000x1200_1._CB803154701_.jpg",
    },
  ];
  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full md:h-80 h-48 rounded-lg overflow-hidden mb-6 relative">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}>
          <img
            src={image.url}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full border border-gray-400 transition-colors duration-200
                       ${
                         index === current
                           ? "bg-white border-white"
                           : "bg-transparent hover:bg-white"
                       }`}></button>
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
