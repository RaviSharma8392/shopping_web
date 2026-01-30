import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/UserContext";
import { editUserProfile } from "../services/userService";
import {
  User,
  Calendar,
  ArrowLeft,
  Save,
  Loader2,
  Camera,
  Mail,
  Smartphone,
  ChevronRight,
} from "lucide-react";

const EditProfilePage = () => {
  const { user, updateUserAndSync } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ===============================
     Sync form when user loads
  =============================== */
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!form.name.trim()) {
        throw new Error("Full Name is required");
      }

      const updates = {
        name: form.name.trim(),
        gender: form.gender || null,
        dateOfBirth: form.dateOfBirth || null,
        updatedAt: new Date().toISOString(),
      };

      // 1️⃣ Firestore
      await editUserProfile(user.uid, updates);

      // 2️⃣ AuthContext + localStorage
      await updateUserAndSync(updates);

      navigate("/user/profile");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  /* ===============================
     Reusable Input
  =============================== */
  const InputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    icon: Icon,
    disabled = false,
  }) => (
    <div className="w-full group">
      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-0.5">
        {label}
      </label>
      <div className={`relative ${disabled ? "opacity-60" : ""}`}>
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors pointer-events-none">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full h-10 ${
            Icon ? "pl-9" : "pl-3"
          } pr-3 border border-gray-200 rounded-lg text-sm bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex justify-center py-6 px-4 font-sans">
      <div className="w-full max-w-lg">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/user/profile")}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-600 transition-colors bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
            <ArrowLeft size={14} /> Back
          </button>
          <h2 className="text-sm font-bold text-gray-900">Edit Profile</h2>
          <div className="w-12" /> {/* Spacer for visual balance */}
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <div className="relative bg-gradient-to-b from-red-50/50 to-white border-b border-gray-100 p-8 flex flex-col items-center justify-center">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-red-100 overflow-hidden">
                  <User size={40} className="text-red-200" />
                </div>
                <div className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform">
                  <Camera size={14} />
                </div>
              </div>
              <p className="mt-3 text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer">
                Change Photo
              </p>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-5">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-xs font-medium text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  {error}
                </div>
              )}

              {/* Full Name */}
              <InputField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                icon={User}
              />

              {/* Gender & DOB Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Custom Gender Select */}
                <div className="w-full group">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-0.5">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="w-full h-10 pl-3 pr-8 border border-gray-200 rounded-lg text-sm bg-gray-50/50 text-gray-900 focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none appearance-none transition-all cursor-pointer">
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronRight
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none group-focus-within:text-red-600"
                    />
                  </div>
                </div>

                <InputField
                  label="Birth Date"
                  name="dateOfBirth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  icon={Calendar}
                />
              </div>

              {/* Divider & Read-only Section */}
              <div className="pt-4 mt-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gray-100"></div>
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                    Private Details
                  </span>
                  <div className="h-px flex-1 bg-gray-100"></div>
                </div>

                <div className="space-y-4">
                  <InputField
                    label="Email Address"
                    value={user.email}
                    disabled
                    icon={Mail}
                  />
                  <InputField
                    label="Phone Number"
                    value={user.phone}
                    disabled
                    icon={Smartphone}
                  />
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/user/profile")}
                className="px-4 h-9 rounded-lg text-xs font-bold text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm border border-transparent hover:border-gray-200 transition-all">
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 h-9 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-md shadow-red-200 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Save size={14} />
                )}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
