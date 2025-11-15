const QuickViewImages = ({ images, activeImage, setActiveImage }) => {
  return (
    <div className="w-full mb-5">
      <img
        src={activeImage}
        className="w-full h-64 object-cover rounded-xl shadow-sm"
      />

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setActiveImage(img)}
              className={`w-16 h-20 object-cover rounded-lg cursor-pointer border transition ${
                activeImage === img
                  ? "border-black shadow-md"
                  : "border-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickViewImages;
