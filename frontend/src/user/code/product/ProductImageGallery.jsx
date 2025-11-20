import React, { useState } from "react";
import { Share2, ChevronLeft, ChevronRight, X } from "lucide-react";
import FullScreenImageViewer from "../view/FullScreenImageViewer";

const ProductImageGallery = ({
  images,
  activeIndex,
  onImageChange,
  productName,
  tagText = "Sale",
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [isFullScreen, setIsFullScreen] = useState(false);

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
    if (window.innerWidth < 768) {
      setCurrentIndex(index);
      setIsFullScreen(true);
    } else {
      setCurrentIndex(index);
      onImageChange(index);
    }
  };

  return (
    <>
      {/* Desktop/Main Gallery */}
      <div className="flex flex-col md:flex-row gap-4 relative">
        {/* Main Image */}
        <div className="relative flex-1 overflow-hidden bg-gray-100">
          <img
            src={images[currentIndex]}
            alt={productName}
            className="w-full h-[400px] md:h-[600px] object-cover cursor-pointer"
            onClick={() => window.innerWidth < 768 && setIsFullScreen(true)}
          />

          {/* Red Tag */}
          {tagText && (
            <div className="absolute top-0 left-0 bg-red-500 opacity-50 text-white px-3 py-1 text-sm font-[crimson] shadow-md">
              {tagText}
            </div>
          )}

          {/* Share Button */}
          <button className="absolute top-4 right-4 bg-transparent p-2 rounded-full shadow-md hover:bg-gray-100 transition">
            <Share2 size={18} className="text-white" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 p-2 rounded-full transition">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-full transition">
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="hidden md:flex md:flex-col gap-2 overflow-y-auto md:max-h-[500px]">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? "border-[#B4292F] ring-2 ring-[#B4292F]/30"
                  : "border-gray-200 hover:border-gray-400"
              }`}>
              <img
                src={img}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Fullscreen Modal */}
      {isFullScreen && (
        <FullScreenImageViewer
          images={images}
          activeIndex={currentIndex}
          onImageChange={onImageChange}
          onClose={setIsFullScreen}
        />
      )}
    </>
  );
};

export default ProductImageGallery;
