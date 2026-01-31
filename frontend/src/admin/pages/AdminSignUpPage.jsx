import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import { COLORS } from "../../style/theme";
import { signupUser } from "../../userApp/features/auth/services/authService";

const AdminSignupPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
  });

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
      await signupUser(form);
      navigate("/account/email-verification");
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
          alt="Signup Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2
            className="text-3xl font-[lora] mb-2 text-center"
            style={{ color: COLORS.primary }}>
            Create an Account
          </h2>
          <p
            className="text-sm mb-6 text-center"
            style={{ color: COLORS.text }}>
            Fill in the details below to get started
          </p>

          {/* Error */}
          {error && (
            <div
              className="p-3 rounded-lg text-sm mb-4"
              style={{ background: COLORS.accent, color: COLORS.primary }}>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: COLORS.secondary,
                  "--tw-ring-color": COLORS.primary,
                }}
              />
              {/* 
              <input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  borderColor: COLORS.secondary,
                  "--tw-ring-color": COLORS.primary,
                }}
              /> */}
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Please Enter your 10 digit Mobile Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: COLORS.secondary,
                "--tw-ring-color": COLORS.primary,
              }}
            />

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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p
            className="text-sm text-center mt-4"
            style={{ color: COLORS.text }}>
            Already have an account?{" "}
            <Link
              to="/account/login"
              className="font-semibold"
              style={{ color: COLORS.primary }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;
