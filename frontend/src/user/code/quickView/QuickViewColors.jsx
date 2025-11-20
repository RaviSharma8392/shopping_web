const QuickViewColors = ({ colors, selectedColor, setSelectedColor }) => {
  if (!colors || colors.length === 0) return null;

  // If only ONE color → show default non-selectable box
  if (colors.length === 1) {
    const c = colors[0];
    return (
      <div className="mt-4">
        <h4 className="text-sm uppercase font-semibold mb-2">Color</h4>

        <div className="flex items-center gap-3 border rounded-lg p-2 w-fit">
          <img
            src={c.image}
            alt={c.name}
            className="w-10 h-10 rounded object-cover border-gray-300"
          />
          <span className="text-sm font-medium">{c.name}</span>
        </div>
      </div>
    );
  }

  // MULTIPLE COLORS → Show selection UI
  return (
    <div className="mt-4">
      <h4 className="text-sm uppercase font-semibold mb-2">Select Color</h4>

      <div className="flex gap-4">
        {colors.map((c, i) => (
          <div
            key={i}
            onClick={() => setSelectedColor(c)}
            className={`cursor-pointer p-2 rounded-lg flex items-center gap-2
              ${
                selectedColor?.name === c.name
                  ? "border-red-500 shadow-md"
                  : "border-gray-300"
              }
            border transition`}>
            <img
              src={c.image}
              alt={c.name}
              className="w-10 h-10 rounded object-cover border-gray-300"
            />
            <span className="text-sm font-medium">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickViewColors;
