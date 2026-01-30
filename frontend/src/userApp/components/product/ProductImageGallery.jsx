import React, { useState, useCallback, useMemo } from "react";
import { Share2, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import FullScreenImageViewer from "../view/FullScreenImageViewer";

const ProductImageGallery = ({
  images = [],
  activeIndex = 0,
  onImageChange,
  productName,
  discountBadge = null,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Memoized Navigation
  const handleNavigate = useCallback(
    (direction) => {
      let nextIndex;
      if (direction === "next") {
        nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      } else {
        nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      }
      onImageChange(nextIndex);
    },
    [activeIndex, images.length, onImageChange],
  );

  const currentImage = useMemo(
    () => images[activeIndex],
    [images, activeIndex],
  );

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:max-h-[600px] pb-2 md:pb-0">
        {images.map((img, index) => (
          <button
            key={`${img}-${index}`}
            onClick={() => onImageChange(index)}
            className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-md overflow-hidden transition-all duration-300 border-2 ${
              activeIndex === index
                ? "border-black shadow-md scale-105"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}>
            <img
              src={img}
              alt={`${productName} view ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Main View */}
      <div className="relative flex-1 group bg-[#F9F9F9] rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {discountBadge && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm">
            {discountBadge}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
            <Share2 size={18} />
          </button>
          <button
            onClick={() => setIsFullScreen(true)}
            className="p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-black hover:text-white transition-all">
            <Maximize2 size={18} />
          </button>
        </div>

        {/* Image (No Zoom) */}
        <div
          className="relative w-full h-[500px] md:h-[700px] overflow-hidden cursor-pointer"
          onClick={() => setIsFullScreen(true)}>
          <img
            src={currentImage}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate("prev");
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300">
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate("next");
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-300">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Full Screen Viewer */}
      {isFullScreen && (
        <FullScreenImageViewer
          images={images}
          activeIndex={activeIndex}
          onImageChange={onImageChange}
          onClose={() => setIsFullScreen(false)}
        />
      )}
    </div>
  );
};

export default ProductImageGallery;
