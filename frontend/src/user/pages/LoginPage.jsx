import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, googleSignup } from "../firebase/firebaseauth";

const GoogleButton = ({ onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="w-full py-3 mb-5 rounded-lg border border-gray-300 flex items-center justify-center gap-3 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-70">
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADmUlEQVR4Ab1XA5AjQRQ9G6UrnV0627Zt27Zt27Zt27Z9FyeXiZN3v1NzW9vTmd3J6lW9cKbf6690EmlFIBDIQGzr9/vXE+8RjUSPTIP82Xq6pg27VvPCGoTz08KbiE5oBF3rIG6ge/PGWBhAGlpkAdEHzRCMeInzyEjqcHedj258gbgBM/KU1syjVbwo3aBHCPh+foe0YyMsw/vC0KI2dDVLQ1ejFAzNasI8tDekLWvh+/5VzYQOQGENOxfFfb9+wDplNHTVS0JXrUTUpGusk0aye0Ka4CPBi6cNFXbn2RPQ16vIi2igvn4luC6dVUuHWBOs4KCAtGtzOKICbXOnqKVjbqhW8yl2rrqwqUcb2Nctg/P4QThPHKLXy2Hq2ZYXXzgTCARUu4NLBetzZbHp61YQhI3tG8N9/zbU4L53C4bW9fF3+XwtnbH+f79nVA4Z++IBgri5fxcEbDZEh4Bk19qaEkUhPQt/W24Bxwd4z6SEdVSOCHHWcn6LCXEN0m7Fwr+ec/ZpJrznkwcpLcsEfZ3icJ4+hvgAaa9hBu5x+X9Qk4lH0H0wJ+D1xpeB28yAEZHgvZqFM+B71gZRoeoMu2ZeeuEVBhMz4OEMXEjJGfC/nxBnBnbc8CgNuBPUwKYr7pAGDFGm4GnrODOw97YQAZ1YhA9rcQa+Xy0Ij9+LcPFR5xcMXHnlFYtQbMPZEeLHTuRE+d2NcfjDeYSL3bc8goFfloDYhuwMxw+iT3CcT42Zh4uh+O5mQdY83BUGpxla8dcZQPPFEifeeY0j1CBqGTxskhPu20W3pjJhju3PjIDFHf0o9viAUbucwu73iPmXAKT7/2O0AZHw065Dxf3tBBP1j/bC1R/3oYa35s/odmQ3CVo5cRYNh1sI/9rIP8d5/X6+0k59vioLi2x+ciAWPNyEvW9PYd+701jxdAe6nx+HErubB78vtXkUqsz5FmHg2mufUtxDmrmVB5J5UGDb6yOCuFaW2NEZFRfeFXpfNjBL7Rj+DAqc+XKd0tE+bAOl9rTEuqdHQok/BpBK7VyYRz69cvgl6THu5iKU3NNck3ivixPxyvQhlPhvALmi+0NSmDfBF+eWV4fQ//JU1DnSA6X3tmQ7pTbthh4XJgRr4bXpI2QI4rTBQurKYiSeIo7Awi7sXIOJ1Oz0SvTGQthDnKWW83CisZ4ohSEsEdfKrRY3YAdIYis2v4m3iTqiW6ZO/mwNG6/yhNOEf6HhfzYhUKeuAAAAAElFTkSuQmCC"
      alt="Google"
      className="w-5 h-5"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "block";
      }}
    />
    <svg
      className="w-5 h-5 hidden"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
      />
    </svg>
    {loading ? "Loading..." : "Continue with Google"}
  </button>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Custom color scheme
  const COLORS = {
    primary: "#ff356c",
    secondary: "#e0e0e0",
    text: "#2d3748",
    accent: "#fff5f7",
  };

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

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-[lora] mb-2 text-center text-[#ff356c]">
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
          <div>
            <label
              className="text-sm font-medium mb-2 block"
              style={{ color: COLORS.text }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.secondary,
                "--tw-ring-color": COLORS.primary,
              }}
            />
          </div>

          <div>
            <label
              className="text-sm font-medium mb-2 block"
              style={{ color: COLORS.text }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
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
                className="absolute right-4 top-3 text-sm font-medium"
                style={{ color: COLORS.primary }}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg text-white font-semibold transition hover:opacity-90 disabled:opacity-70"
            style={{
              background: COLORS.primary,
            }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-sm" style={{ color: COLORS.text }}>
            Don't have an account?{" "}
            <Link
              to="/account/register"
              className="font-semibold"
              style={{ color: COLORS.primary }}>
              Sign Up
            </Link>
          </p>

          <p className="text-sm" style={{ color: COLORS.text }}>
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
