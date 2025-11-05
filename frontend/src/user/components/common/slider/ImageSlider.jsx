import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md">
      <img
        src={images[index]}
        alt="product"
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Quick View */}
      <div className="absolute bottom-0 w-full opacity-0 group-hover:opacity-100 transition-all duration-300 text-center pb-2">
        <button className="bg-black/70 text-white text-xs px-4 py-1 rounded-full">
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
