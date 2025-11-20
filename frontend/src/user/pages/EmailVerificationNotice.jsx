import { useEffect, useState } from "react";
import { applyActionCode, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // Read query params
    const url = new URL(window.location.href);
    const mode = url.searchParams.get("mode");
    const oobCode = url.searchParams.get("oobCode");

    if (mode !== "verifyEmail" || !oobCode) {
      setStatus("invalid");
      return;
    }

    // Verify email using Firebase
    applyActionCode(auth, oobCode)
      .then(() => {
        setStatus("success");
        // Clear any cached auth state
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Email Verification
          </h1>
          <p className="text-blue-100 text-sm md:text-base">
            Securing your account access
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Loading State */}
          {status === "loading" && (
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Verifying Your Email
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Please wait while we confirm your email address...
                </p>
              </div>
              <div className="pt-4">
                <div className="flex justify-center space-x-1">
                  {[1, 2, 3].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"
                      style={{ animationDelay: `${dot * 0.2}s` }}></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Email Verified Successfully! 🎉
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  Your email has been verified. You now have full access to your
                  account.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleNavigateToDashboard}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                  Go to Dashboard
                </button>
                <button
                  onClick={handleNavigateToLogin}
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                  Sign In Now
                </button>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  You will be redirected automatically in a few seconds...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-10 h-10 text-red-600"
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
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Verification Failed
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-4">
                  The verification link is invalid or has expired.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-yellow-800">
                    <strong>Possible reasons:</strong>
                  </p>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• The link has already been used</li>
                    <li>• The link has expired (usually 24 hours)</li>
                    <li>• Invalid verification code</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleRetry}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200">
                  Try Again
                </button>
                <Link
                  to="/resend-verification"
                  className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-center">
                  Request New Verification Email
                </Link>
                <Link
                  to="/support"
                  className="block text-blue-600 hover:text-blue-800 text-sm font-medium text-center">
                  Contact Support
                </Link>
              </div>
            </div>
          )}

          {/* Invalid State */}
          {status === "invalid" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Invalid Request
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  This verification link appears to be malformed or incomplete.
                </p>
              </div>
              <div className="space-y-3 pt-2">
                <Link
                  to="/login"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-center">
                  Go to Login
                </Link>
                <Link
                  to="/"
                  className="block text-blue-600 hover:text-blue-800 text-sm font-medium text-center">
                  Return to Homepage
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Secure Verification</span>
            <span>🔒 Protected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
