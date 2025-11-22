const PaymentMobilePopup = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:hidden">
      {/* Overlay click closes */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-white w-full rounded-t-2xl p-4 relative z-20 max-h-[70%] overflow-y-auto">
        <button className="absolute top-2 right-3 text-xl" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default PaymentMobilePopup;
