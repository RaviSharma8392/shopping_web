const PaymentOptions = ({ method, setMethod, openPopup }) => {
  const handleClick = (m) => {
    setMethod(m);
    if (window.innerWidth < 768) openPopup?.(true);
  };

  const icons = {
    upi: (
      <img
        width="30"
        height="30"
        src="https://www.pikpng.com/pngl/m/419-4195720_transparent-png-icons.png"
      />
    ),
    cod: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="14"
        viewBox="0 0 24 16">
        <g fill="none" fillRule="evenodd" transform="rotate(-6 29.622 -5.581)">
          <path
            stroke="#000"
            d="M19.938 1.386l1.03.072a1 1 0 0 1 .928 1.067l-.697 9.976a1 1 0 0 1-1.068.927L1.988 11.946"
          />
          <rect width="20" height="12" stroke="#000" rx="1" />
          <path
            fill="#000"
            fillRule="nonzero"
            d="M10.622 10l.744-.36-2.27-2.38c.216-.039.427-.101.633-.188.206-.086.394-.199.563-.336.17-.138.317-.3.441-.488.125-.188.214-.4.267-.637h1v-.798h-.992a1.612 1.612 0 0 0-.067-.234 2.82 2.82 0 0 0-.24-.5 1.462 1.462 0 0 0-.146-.204H12V3H8.122v.875h.559c.218 0 .414.025.588.075.174.05.325.117.454.204a1.276 1.276 0 0 1 .508.659h-2.11v.798h2.09c-.07.173-.179.32-.324.442a1.96 1.96 0 0 1-.488.298 3.005 3.005 0 0 1-1.063.23L8 7.198 10.622 10z"
          />
          <path
            stroke="#000"
            d="M3 0c-.167.833-.5 1.5-1 2s-1.167.833-2 1M3 12c-.167-.833-.5-1.5-1-2S.833 9.167 0 9M17 0c.167.833.5 1.5 1 2s1.167.833 2 1M17 12c.167-.833.5-1.5 1-2s1.167-.833 2-1"
          />
        </g>
      </svg>
    ),
    netbanking: (
      <img
        width="22"
        height="22"
        src="https://png.pngtree.com/png-vector/20190214/ourmid/pngtree-vector-bank-icon-png-image_515245.jpg"
      />
    ),
  };

  const OptionItem = ({ value, label }) => {
    const isActive = method === value;

    return (
      <button
        onClick={() => handleClick(value)}
        className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg border transition-all
          ${
            isActive
              ? "border-[#ff3f6c] bg-[#fff1f5]"
              : "border-gray-300 bg-white"
          }
        `}>
        <div className="flex items-center gap-3">
          <span>{icons[value]}</span>
          <span className="text-sm font-medium">{label}</span>
        </div>

        {/* Arrow: Rotate only for selected */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          className={`transition-transform ${
            isActive ? "rotate-180 text-[#ff3f6c]" : "rotate-0 text-gray-400"
          }`}>
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4  ">
      <h2 className="font-semibold text-xs text-gray-500 mb-3 tracking-widest">
        PAYMENT OPTIONS
      </h2>

      <div className="space-y-3 md:space-y-5">
        <OptionItem value="cod" label="Cash on Dcelivery" />
        <OptionItem value="upi" label="UPI / QR" />
        <OptionItem value="netbanking" label="Netbanking" />
      </div>
    </div>
  );
};

export default PaymentOptions;
