const QuickViewColors = ({ colors, selectedColor, setSelectedColor }) => {
  if (!colors?.length) return null;

  return (
    <div className="mt-6">
      <p className="font-medium text-gray-800">Color:</p>

      <div className="flex gap-4 mt-3">
        {colors.map((c, i) => (
          <div
            key={i}
            onClick={() => setSelectedColor(c)}
            className="cursor-pointer flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full border shadow-sm ${
                selectedColor?.name === c.name ? "ring-2 ring-black" : ""
              }`}
              style={{ background: c.hex }}></div>

            <p className="text-xs mt-1 text-gray-600">{c.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickViewColors;
