import React, { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

// 1. Define the E-commerce Color Palette
const THEME_COLORS = {
  // General
  defaultBackground: "#FFFFFF",
  defaultText: "#333333",
  defaultBorder: "#DDDDDD",

  // Status Colors
  success: {
    bg: "#D4EDDA", // Light Green
    text: "#155724", // Dark Green
    border: "#C3E6CB", // Medium Green
  },
  error: {
    bg: "#F8D7DA", // Light Red
    text: "#721C24", // Dark Red
    border: "#F5C6CB", // Medium Red
  },
  info: {
    bg: "#CCE5FF", // Light Blue (often used for info, promotions, or general alerts)
    text: "#004085", // Dark Blue
    border: "#B8DAFF", // Medium Blue
  },
  warning: {
    bg: "#FFF3CD", // Light Yellow (for caution/warning messages like 'low stock')
    text: "#856404", // Dark Yellow/Brown
    border: "#FFEEBA", // Medium Yellow
  },
};

const Notification = ({
  type = "info",
  message,
  onClose,
  duration = 5000, // Reduced duration for a typical, non-critical toast
}) => {
  const iconSize = 22;

  // Use AlertTriangle for both 'error' and 'warning' if they are needed,
  // or define a separate icon for 'warning' if desired.
  const ICONS = {
    success: <CheckCircle size={iconSize} strokeWidth={1.8} />,
    error: <AlertTriangle size={iconSize} strokeWidth={1.8} />,
    info: <Info size={iconSize} strokeWidth={1.8} />,
    warning: <AlertTriangle size={iconSize} strokeWidth={1.8} />, // Re-using AlertTriangle for Warning
  };

  useEffect(() => {
    // Only set a timeout if duration is a positive number
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  // Get the appropriate colors based on the notification type
  const { bg, text, border } = THEME_COLORS[type] || {
    bg: THEME_COLORS.defaultBackground,
    text: THEME_COLORS.defaultText,
    border: THEME_COLORS.defaultBorder,
  };

  return (
    <div
      className="fixed top-5 right-5 z-50 p-4 rounded-lg flex items-center gap-3 shadow-lg border animate-slide-in"
      style={{
        background: bg,
        color: text,
        minWidth: "280px", // Slightly wider for better readability
        maxWidth: "400px",
        borderColor: border,
      }}>
      {/* Icon - color is derived from the text color */}
      <div>{ICONS[type] || ICONS.info}</div>

      {/* Message */}
      <p className="text-sm font-medium flex-1">{message}</p>

      {/* Close Button */}
      <button onClick={onClose} className="hover:opacity-70 p-1 -m-1">
        <X size={20} />
      </button>
    </div>
  );
};

export default Notification;
