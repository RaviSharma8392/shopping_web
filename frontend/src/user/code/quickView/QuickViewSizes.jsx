const QuickViewSizes = ({ sizes, selectedSize, setSelectedSize }) => {
  if (!sizes?.length) return null;

  return (
    <div className="mt-6">
      <p className="font-medium text-gray-800">Size:</p>

      <div className="grid grid-cols-5 gap-3 mt-3">
        {sizes.map((s) => {
          const unavailable = s.available === false;

          return (
            <button
              key={s.size}
              disabled={unavailable}
              onClick={() => !unavailable && setSelectedSize(s.size)}
              className={`py-2 rounded-lg border text-sm font-medium relative transition
                ${
                  selectedSize === s.size
                    ? "border-black bg-black text-white"
                    : "hover:border-black"
                }
                ${
                  unavailable
                    ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                    : ""
                }`}>
              {s.size}
              {unavailable && (
                <span className="absolute inset-0 flex items-center justify-center text-gray-500">
                  ✕
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickViewSizes;
