import { Link } from "react-router-dom";
import GoogleButton from "../button/GoggleButton";
import { COLORS } from "../../../style/theme";

const StepSelectMethod = ({
  setStep,
  email,
  setEmail,
  setError,
  onGoogleSignup,
}) => {
  const handleEmailContinue = (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setStep(1);
  };

  return (
    <div className="max-w-md mx-auto w-full px-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-[crimsonPro] text-gray-900 mb-2">
          Sign up{" "}
        </h1>
        <p className="text-gray-600 text-sm">
          Join thousands of users worldwide
        </p>
      </div>

      {/* Google Button */}
      <div className="mb-4">
        <GoogleButton handleGoogle={onGoogleSignup} />
      </div>

      {/* Divider */}
      <div className="flex items-center mb-4">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-2 text-gray-500 text-sm">
          or continue with email
        </span>
        <hr className="flex-1 border-gray-300" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleEmailContinue} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="w-full py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition">
          Continue with Email
        </button>
      </form>

      {/* Terms Notice */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        By continuing, you agree to our{" "}
        <Link to="/terms" className="text-gray-800 underline">
          Terms of Service
        </Link>
        ,{" "}
        <Link to="/privacy" className="text-gray-800 underline">
          Privacy Policy
        </Link>
        , and{" "}
        <Link to="/cookies" className="text-gray-800 underline">
          Cookie Policy
        </Link>
        .
      </p>

      {/* Login & Forgot Password */}
      <div className="mt-4 text-center space-y-2">
        <p className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/account/login"
            className="font-semibold text-gray-900 underline">
            Sign In
          </Link>
        </p>
        <p className="text-sm text-gray-700">
          <Link
            to="/account/forgot-password"
            className="font-semibold text-gray-900 underline">
            Forgot your password?
          </Link>
        </p>
      </div>

      {/* Security Info */}
      <div className="mt-4 text-center text-xs text-gray-500">
        Your information is secure and encrypted
      </div>
    </div>
  );
};

export default StepSelectMethod;
