const QuickViewQuantity = ({ qty, setQty }) => {
  return (
    <div className="mt-6 flex items-center gap-4">
      <button
        onClick={() => qty > 1 && setQty(qty - 1)}
        className="px-3 py-1 border rounded">
        -
      </button>

      <span className="text-lg font-semibold">{qty}</span>

      <button
        onClick={() => setQty(qty + 1)}
        className="px-3 py-1 border rounded">
        +
      </button>
    </div>
  );
};

export default QuickViewQuantity;
