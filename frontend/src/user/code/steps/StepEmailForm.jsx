import { useState } from "react";

const StepEmailForm = ({
  email,
  setEmail,
  mobile,
  setMobile,
  setStep,
  setError,
}) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "email":
        if (!value.trim()) {
          error = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "mobile":
        const cleanMobile = value.replace(/\D/g, "");
        if (!value.trim()) {
          error = "Mobile number is required";
        } else if (cleanMobile.length !== 10) {
          error = "Please enter a valid 10-digit mobile number";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      validateField("email", email);
    } else {
      validateField("mobile", mobile);
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, "");
    const limited = phoneNumber.slice(0, 10);
    if (limited.length === 0) return "";
    if (limited.length <= 3) return `(${limited}`;
    if (limited.length <= 6)
      return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    return `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(
      6
    )}`;
  };

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value);
    setMobile(formatted);
    if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateField("email", email);
    const isMobileValid = validateField("mobile", mobile);

    if (!isEmailValid || !isMobileValid) {
      setTouched({ email: true, mobile: true });
      setError("Please fix the errors above");
      return;
    }

    setError("");
    setStep(2);
  };

  return (
    <div className="animate-fadeIn max-w-md mx-auto w-full">
      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl  uppercase font-bold text-gray-900 mb-2">
          Sign Up{" "}
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          You are one step away from setting up your account with{" "}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              className={`w-full px-4 py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#B4292F] focus:border-transparent outline-none transition-all duration-200 ${
                errors.email && touched.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              onBlur={() => handleBlur("email")}
            />
          </div>
          {errors.email && touched.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Mobile Input */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <div className="relative">
            <input
              id="mobile"
              type="tel"
              placeholder="(123) 456-7890"
              className={`w-full px-4 py-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-[#B4292F] focus:border-transparent outline-none transition-all duration-200 ${
                errors.mobile && touched.mobile
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
              value={mobile}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => handleBlur("mobile")}
            />
          </div>
          {errors.mobile && touched.mobile && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.mobile}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 md:py-3.5 bg-[#B4292F] text-white font-semibold rounded-lg hover:bg-[#9c2328] focus:ring-2 focus:ring-[#B4292F] focus:ring-offset-2 transition-all duration-200 text-sm md:text-base">
          CONTINUE
        </button>
      </form>

      {/* Back button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setStep(0)}
          className="text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center gap-2 mx-auto">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to previous step
        </button>
      </div>
    </div>
  );
};

export default StepEmailForm;
