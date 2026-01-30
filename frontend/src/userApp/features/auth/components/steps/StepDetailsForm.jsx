import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const StepDetailsForm = ({
  userInfo,
  setUserInfo,
  onSubmit,
  loading,
  setStep,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Update field
  const updateField = (key, value) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  // Handle blur
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, userInfo[field]);
  };

  // Validate field
  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const valid =
      validateField("name", userInfo.name) &
      validateField("password", userInfo.password);

    if (valid) {
      onSubmit();
    } else {
      setTouched({
        name: true,
        password: true,
      });
    }
  };

  return (
    <div className="animate-fadeIn max-w-md mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl uppercase font-[crimsonPro] text-gray-900">
          Sign Up
        </h2>
        <p className="text-gray-600 mt-1 text-sm md:text-base">
          Complete your account setup
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* NAME */}
        <div>
          <div
            className={`relative rounded-xl border bg-white transition-all ${
              errors.name && touched.name
                ? "border-red-500"
                : "border-gray-300 focus-within:border-[#B4292F]"
            }`}>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => updateField("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              className="peer w-full bg-transparent px-4 pt-5 pb-2 outline-none rounded-xl"
            />
            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-[#B4292F] peer-valid:-translate-y-3 peer-valid:text-xs">
              Name *
            </label>
          </div>
          {errors.name && touched.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div
            className={`relative rounded-xl border bg-white transition-all ${
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300 focus-within:border-[#B4292F]"
            }`}>
            <input
              type={showPassword ? "text" : "password"}
              value={userInfo.password || ""}
              onChange={(e) => updateField("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              className="peer w-full bg-transparent px-4 pt-5 pb-2 outline-none rounded-xl"
            />

            <button
              type="button"
              className="absolute right-4 top-4 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            <label className="absolute left-4 top-3 text-gray-500 text-sm transition-all peer-focus:-translate-y-3 peer-focus:text-xs peer-focus:text-[#B4292F] peer-valid:-translate-y-3 peer-valid:text-xs">
              Password *
            </label>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#B4292F] text-white text-center font-semibold rounded-xl shadow-md hover:bg-[#9c2328] transition disabled:opacity-50">
          {loading ? "Creating Account..." : "Complete Profile"}
        </button>
      </form>

      {/* BACK BUTTON */}
      <div className="text-center mt-6">
        <button
          onClick={() => setStep(1)}
          className="text-gray-600 hover:text-black text-sm">
          ← Back to previous step
        </button>
      </div>
    </div>
  );
};

export default StepDetailsForm;
