import React from "react";

const Poster = ({ imageUrl, altText = "Poster" }) => {
  return (
    <div className="w-full  sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-lg shadow-lg relative">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-contain md:object-cover object-center"
      />
    </div>
  );
};

export default Poster;
