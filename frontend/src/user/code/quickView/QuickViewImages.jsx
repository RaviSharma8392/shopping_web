const QuickViewImages = ({ images, activeImage, setActiveImage }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 order-2 md:order-1">
        {images.slice(0, 5).map((img, i) => (
          <div
            key={i}
            className={`
              w-20 h-20 rounded-lg overflow-hidden cursor-pointer border 
              ${
                activeImage === img
                  ? "border-red-500 shadow"
                  : "border-gray-200 hover:border-gray-400"
              }
            `}
            onClick={() => setActiveImage(img)}>
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 order-1 md:order-2">
        <div className="aspect-[3/4] w-full overflow-hidden">
          <img
            src={activeImage}
            className="w-full h-full object-cover transition-none"
          />
        </div>
      </div>
    </div>
  );
};

export default QuickViewImages;
