const StepSuccess = ({ signupMethod = "email" }) => {
  return (
    <div className="text-center animate-fadeIn max-w-md mx-auto">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-green-600"
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

      {/* Success Message */}
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {signupMethod === "google" ? "Welcome! 🎉" : "Success! 🎉"}
      </h2>

      {/* Dynamic Message based on signup method */}
      <div className="text-gray-600 mb-8">
        {signupMethod === "google" ? (
          <p className="text-lg">
            Your account has been created successfully with Google.
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg">
              Your account has been created successfully!
            </p>
            <p className="text-sm">
              Please check your email to verify your account.
            </p>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-left">
            <p className="text-sm text-blue-800 font-medium">
              {signupMethod === "google"
                ? "You're all set! You can now access all features."
                : "Check your inbox for verification link"}
            </p>
            {signupMethod === "email" && (
              <p className="text-xs text-blue-600 mt-1">
                Didn't receive the email? Check your spam folder or request a
                new one.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {signupMethod === "email" && (
          <button className="w-full py-3 bg-[#B4292F] text-white font-semibold rounded-lg hover:bg-[#9c2328] transition-colors duration-200">
            Resend Verification Email
          </button>
        )}
        <button className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200">
          Go to Dashboard
        </button>
      </div>

      {/* Support Text */}
      <p className="text-xs text-gray-500 mt-6">
        Need help?{" "}
        <a
          href="/contact"
          className="text-[#B4292F] hover:underline font-medium">
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default StepSuccess;
