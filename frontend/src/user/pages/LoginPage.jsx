import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../style/theme";
import { loginUser, googleSignup } from "../firebase/firebaseauth";
import { FaGoogle } from "react-icons/fa";

const GoogleButton = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full py-3 mb-5 rounded-full border border-gray-300 flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-100 transition">
    <FaGoogle size={20} />
    {loading ? "Loading..." : "Continue with Google"}
  </button>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser(form.email, form.password);
      navigate("/"); // redirect to home or dashboard
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await googleSignup();
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white md:rounded-2xl md:shadow-lg p-8">
        {/* Google Login */}
        <GoogleButton onClick={handleGoogleLogin} loading={loading} />

        {/* Title */}
        <h2
          className="text-3xl font-[lora] mb-2 text-center"
          style={{ color: COLORS.primary }}>
          Login
        </h2>
        <p className="text-sm mb-6 text-center" style={{ color: COLORS.text }}>
          Enter your email and password to continue
        </p>

        {/* Error Message */}
        {error && (
          <div
            className="p-3 rounded-lg text-sm mb-4 text-center"
            style={{ background: COLORS.accent, color: COLORS.primary }}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: COLORS.secondary,
              "--tw-ring-color": COLORS.primary,
            }}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.secondary,
                "--tw-ring-color": COLORS.primary,
              }}
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-sm text-gray-500"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold transition"
            style={{
              background: COLORS.primary,
              opacity: loading ? 0.7 : 1,
            }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <p className="text-sm text-center mt-4" style={{ color: COLORS.text }}>
          Don’t have an account?{" "}
          <Link
            to="/account/register"
            className="font-semibold"
            style={{ color: COLORS.primary }}>
            Sign Up
          </Link>
        </p>

        <p className="text-sm text-center mt-2" style={{ color: COLORS.text }}>
          <Link
            to="/account/forgot-password"
            className="font-semibold"
            style={{ color: COLORS.primary }}>
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
