import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../firebase/firebaseauth";
import Notification from "../../shared/components/Notification";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "info",
    message: "",
  });

  // Custom color scheme
  const COLORS = {
    primary: "#ff356c",
    secondary: "#e0e0e0",
    text: "#2d3748",
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      showToast("success", res);
      setEmail("");
    } catch (err) {
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-50 p-4">
      {/* Toast Notification */}
      {toast.show && (
        <Notification
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
          duration={4000}
        />
      )}

      <div className="w-full max-w-md bg-white p-8 md:rounded-2xl md:shadow-lg">
        {/* Header */}
        <h2 className="text-3xl font-[lora] text-[#ff356c] text-center mb-4">
          Reset Your Password
        </h2>

        {/* Description */}
        <p className="text-sm text-center mb-6" style={{ color: COLORS.text }}>
          Enter your email to receive a password reset link
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="text-sm font-medium mb-2 block"
              style={{ color: COLORS.text }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.secondary,
                "--tw-ring-color": COLORS.primary,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-[#ff356c] rounded-lg text-white font-semibold transition hover:opacity-90 disabled:opacity-70">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-sm text-center mt-4" style={{ color: COLORS.text }}>
          Remember your password?{" "}
          <Link
            to="/account/login"
            className="font-semibold"
            style={{ color: COLORS.primary }}>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
