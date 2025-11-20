// FullScreenImageViewer.jsx
import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const FullScreenImageViewer = ({
  images,
  activeIndex,
  onImageChange,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    onImageChange(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    onImageChange(nextIndex);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    onImageChange(index);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center p-4 md:hidden">
      {/* Close Button */}
      <button
        onClick={() => onClose(false)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/30 hover:bg-white/50">
        <X size={24} className="text-white" />
      </button>

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center w-full">
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex}`}
          className="max-h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto mt-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              currentIndex === index
                ? "border-[#B4292F]"
                : "border-gray-200 hover:border-gray-400"
            }`}>
            <img
              src={img}
              alt={`Product ${index}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Left/Right Navigation */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40">
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40">
        <ChevronRight size={24} className="text-white" />
      </button>
    </div>
  );
};

export default FullScreenImageViewer;
