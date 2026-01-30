import React from "react";

const CustomButton = ({
  text,
  icon,
  loading = false,
  onClick,
  disabled = false,
  bgColor = "#ff356c",
  hoverBgColor = "#e62e5f",
  textColor = "#fff",
  fullWidth = true,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        backgroundColor: disabled ? "#ccc" : bgColor,
        color: textColor,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading)
          e.target.style.backgroundColor = hoverBgColor;
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) e.target.style.backgroundColor = bgColor;
      }}
      className={`
        ${fullWidth ? "w-full" : "inline-flex"}
        flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold shadow-lg
        transition-all duration-300
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${className}
      `}>
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {text}
        </div>
      ) : (
        <>
          {icon && icon}
          {text}
        </>
      )}
    </button>
  );
};

export default CustomButton;
