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
  MapPin,
  Home,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const EditProfilePage = () => {
  const { user, address, updateUserAndSync, saveAddress } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    addressLine1: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 1. SYNC DATA ON LOAD
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth || "",
      }));
    }
    if (address) {
      setForm((prev) => ({
        ...prev,
        addressLine1: address.line1 || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
      }));
    }
  }, [user, address]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  // 2. HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!form.name.trim()) throw new Error("Full Name is required");

      let finalAddressId = user.defaultAddressId;

      // Step A: Save Address (if changed/added)
      if (form.addressLine1 || form.city) {
        const addressPayload = {
          line1: form.addressLine1,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          id: address?.id || null,
        };
        const savedAddr = await saveAddress(addressPayload);
        finalAddressId = savedAddr.id;
      }

      // Step B: Save Profile
      const profileUpdates = {
        name: form.name.trim(),
        gender: form.gender || null,
        dateOfBirth: form.dateOfBirth || null,
        defaultAddressId: finalAddressId,
      };

      await editUserProfile(user.uid, profileUpdates);
      await updateUserAndSync(profileUpdates);

      setSuccess(true);
      // Small delay before redirect so user sees success state
      setTimeout(() => navigate("/user/profile"), 800);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-20">
      {/* --- HEADER BACKGROUND --- */}
      <div className="h-48 bg-gradient-to-r from-gray-900 to-gray-800 relative">
        <button
          onClick={() => navigate("/user/profile")}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/10">
          <ArrowLeft size={16} /> Back to Profile
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-8">
          {/* --- LEFT COLUMN: PROFILE CARD --- */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            {/* Identity Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center p-6">
              <div className="relative inline-block mx-auto mb-4">
                <div className="w-28 h-28 rounded-full bg-gray-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-gray-300" />
                  )}
                </div>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 bg-red-600 text-white p-2 rounded-full shadow-lg border-2 border-white hover:bg-red-700 transition-colors">
                  <Camera size={14} />
                </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900">
                {form.name || "User Name"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{user.email}</p>

              <div className="bg-blue-50 rounded-xl p-4 text-left border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-800 uppercase">
                      Profile Status
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      Your profile is 80% complete.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info (Read Only) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Mail size={16} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs text-gray-400">Email Address</p>
                    <p className="font-medium text-gray-900 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                    <Smartphone size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone Number</p>
                    <p className="font-medium text-gray-900">
                      {user.phone || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: EDIT FORMS --- */}
          <div className="w-full md:w-2/3 flex flex-col gap-6">
            {/* Error / Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />{" "}
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-100 text-green-600 p-4 rounded-xl text-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" /> Profile
                updated successfully! Redirecting...
              </div>
            )}

            {/* 1. Personal Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <User className="text-red-600" size={20} />
                <h3 className="text-lg font-bold text-gray-900">
                  Personal Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" icon={User}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your name"
                  />
                </InputGroup>

                <InputGroup label="Date of Birth" icon={Calendar}>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    className="form-input"
                  />
                </InputGroup>

                <InputGroup label="Gender" icon={User}>
                  <div className="relative">
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className="form-input appearance-none cursor-pointer">
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronRight
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
                      size={16}
                    />
                  </div>
                </InputGroup>
              </div>
            </div>

            {/* 2. Address Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <MapPin className="text-red-600" size={20} />
                <h3 className="text-lg font-bold text-gray-900">
                  Address Details
                </h3>
              </div>

              <div className="space-y-6">
                <InputGroup label="Street Address" icon={Home}>
                  <input
                    type="text"
                    name="addressLine1"
                    value={form.addressLine1}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="House No, Street, Landmark"
                  />
                </InputGroup>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputGroup label="City">
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </InputGroup>

                  <InputGroup label="State">
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </InputGroup>

                  <InputGroup label="Pincode">
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </InputGroup>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate("/user/profile")}
                className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-white border border-transparent hover:border-gray-200 transition-all text-sm">
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-gray-200 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none text-sm">
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {loading ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* CSS Utility for inputs to keep JSX clean */}
      <style>{`
        .form-input {
          width: 100%;
          height: 48px;
          padding-left: 12px;
          padding-right: 12px;
          border-radius: 10px;
          border: 1px solid #E5E7EB;
          background-color: #F9FAFB;
          font-size: 14px;
          color: #111827;
          transition: all 0.2s;
          outline: none;
        }
        .form-input:focus {
          background-color: #FFFFFF;
          border-color: #EF4444; /* Red-500 */
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }
      `}</style>
    </div>
  );
};

// --- Helper Component for Inputs ---
const InputGroup = ({ label, icon: Icon, children }) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 ml-1">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10 group-focus-within:text-red-500 transition-colors">
          <Icon size={18} />
        </div>
      )}
      {/* Clone child to add padding if icon exists */}
      {React.cloneElement(children, {
        style: Icon ? { paddingLeft: "40px" } : {},
      })}
    </div>
  </div>
);

export default EditProfilePage;
