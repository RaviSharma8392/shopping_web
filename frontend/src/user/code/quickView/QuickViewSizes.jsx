const QuickViewSizes = ({ sizes, selectedSize, setSelectedSize }) => {
  if (!sizes || !sizes.length) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm uppercase font-semibold mb-2">Select Size</h4>

      <div className="flex gap-3">
        {sizes.map((s, i) => (
          <span
            key={i}
            onClick={() => setSelectedSize(s)}
            className={`px-4 py-2 rounded-lg cursor-pointer border text-sm
              ${
                selectedSize === s
                  ? "bg-black text-white border-black"
                  : "border-gray-300"
              }
            `}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuickViewSizes;
