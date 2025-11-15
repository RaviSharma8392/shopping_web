import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import { COLORS } from "../../style/theme";
import { loginUser } from "../firebase/firebaseauth";
import { auth } from "../../config/firebase";

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

      // Check email verification
      // if (!auth.currentUser.emailVerified) {
      //   setError("Please verify your email before logging in.");
      //   setLoading(false);
      //   return;
      // }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2">
        <img
          src={IMAGES.signupBanner}
          alt="Login Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2
            className="text-3xl font-[lora] mb-2 text-center"
            style={{ color: COLORS.primary }}>
            Login
          </h2>

          <p
            className="text-sm mb-6 text-center"
            style={{ color: COLORS.text }}>
            Enter your email and password to continue
          </p>

          {/* Error */}
          {error && (
            <div
              className="p-3 rounded-lg text-sm mb-4"
              style={{ background: COLORS.accent, color: COLORS.primary }}>
              {error}
            </div>
          )}

          {/* FORM */}
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

          <p
            className="text-sm text-center mt-4"
            style={{ color: COLORS.text }}>
            Don’t have an account?{" "}
            <Link
              to="/account/signup"
              className="font-semibold"
              style={{ color: COLORS.primary }}>
              Sign Up
            </Link>
          </p>

          <p
            className="text-sm text-center mt-2"
            style={{ color: COLORS.text }}>
            <Link
              to="/account/forgot-password"
              className="font-semibold"
              style={{ color: COLORS.primary }}>
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
