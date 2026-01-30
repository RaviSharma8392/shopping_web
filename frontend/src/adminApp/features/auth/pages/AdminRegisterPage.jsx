import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Ensure this path matches your actual service file location
import { signupUser } from "../../pages/User/features/auth/services/firebaseauth";
import {
  User,
  Mail,
  Lock,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AdminRegisterPage = () => {
  const navigate = useNavigate();

  // --- State ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // --- Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Call your existing signup service.
      // IMPORTANT: You might need to modify 'signupUser' in your 'firebaseauth.js'
      // to accept and save the 'role' to the Firestore user document.
      await signupUser({
        email: formData.email,
        password: formData.password,
        firstName: formData.name, // Mapping full name to firstName for simplicity
        lastName: "", // Optional if your schema requires it
        role: formData.role, // Pass role to be saved
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to register admin.");
    } finally {
      setLoading(false);
    }
  };

  // --- Success View ---
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Admin Created!
          </h2>
          <p className="text-gray-500 mb-8">
            The new{" "}
            <span className="font-semibold text-gray-800">{formData.role}</span>{" "}
            account for <br />
            <span className="font-semibold text-indigo-600">
              {formData.email}
            </span>
            <br /> has been successfully registered.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/dashboard")} // Adjust route as needed
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all">
              Go to Dashboard
            </button>
            <button
              onClick={() => {
                setSuccess(false);
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  role: "admin",
                });
              }}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all">
              Create Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Form View ---
  return (
    <div className="min-h-screen flex items-center justify-center font-poppins bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-4">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            New Admin Registration
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create a new privileged account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex. John Doe"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@company.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all"
              />
            </div>
          </div>

          {/* Role Select */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider ml-1">
              Assign Role
            </label>
            <div className="relative group">
              <Shield className="w-5 h-5 text-gray-400 absolute left-3 top-3.5 group-focus-within:text-indigo-600 transition-colors" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 transition-all appearance-none cursor-pointer text-gray-700">
                <option value="admin">Admin</option>
                <option value="super-admin">Super Admin</option>
                <option value="editor">Editor</option>
                <option value="moderator">Moderator</option>
              </select>
              {/* Custom Arrow Icon */}
              <div className="absolute right-4 top-4 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all mt-4 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
