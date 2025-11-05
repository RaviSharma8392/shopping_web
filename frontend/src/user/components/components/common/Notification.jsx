import React, { useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { COLORS } from "../../style/theme";

const Notification = ({
  type = "info",
  message,
  onClose,
  duration = 3000000,
}) => {
  const iconSize = 22;

  const ICONS = {
    success: <CheckCircle size={iconSize} strokeWidth={1.8} />,
    error: <AlertTriangle size={iconSize} strokeWidth={1.8} />,
    info: <Info size={iconSize} strokeWidth={1.8} />,
  };

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className="fixed top-5 right-5 z-50 p-4  flex items-center gap-3 animate-slide-in"
      style={{
        background: COLORS.accent,
        color: COLORS.primary, // ✅ pink text
        minWidth: "260px",
      }}>
      {/* Icon */}
      <div>{ICONS[type]}</div>

      {/* Message */}
      <p className="text-sm font-medium flex-1">{message}</p>

      {/* Close Button */}
      <button onClick={onClose} className="hover:opacity-70">
        <X size={20} />
      </button>
    </div>
  );
};

export default Notification;
