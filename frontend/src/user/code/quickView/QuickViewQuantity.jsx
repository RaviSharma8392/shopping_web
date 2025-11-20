const QuickViewQuantity = ({ qty, setQty }) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2">Quantity</h4>

      <div className="flex items-center gap-3">
        <button
          onClick={() => qty > 1 && setQty(qty - 1)}
          className="px-3 py-1 border rounded">
          -
        </button>

        <span className="min-w-[40px] text-center font-semibold">{qty}</span>

        <button
          onClick={() => setQty(qty + 1)}
          className="px-3 py-1 border rounded">
          +
        </button>
      </div>
    </div>
  );
};

export default QuickViewQuantity;
