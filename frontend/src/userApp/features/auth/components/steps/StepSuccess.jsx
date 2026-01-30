import React from "react";
import {
  Check,
  Mail,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const StepSuccess = ({
  signupMethod = "email",
  email = "user@example.com",
}) => {
  // Dynamic Content Logic
  const isGoogle = signupMethod === "google";

  return (
    <div className="w-full max-w-md mx-auto animate-fadeIn font-sans">
      {/* MAIN CARD */}
      <div className="bg-white overflow-hidden text-center p-8 md:p-10">
        {/* 1. ANIMATED SUCCESS ICON */}
        <div className="relative mb-8 flex justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 bg-green-50 rounded-full scale-150 animate-pulse opacity-50"></div>

          {/* Icon Container */}
          <div className="relative w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
            <div className="bg-green-600 rounded-full p-2">
              <Check className="w-8 h-8 text-white stroke-[3]" />
            </div>
          </div>
        </div>

        {/* 2. HEADLINES */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          {isGoogle ? "Welcome to the family! 🎉" : "Verify your email"}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-[280px] mx-auto">
          {isGoogle ? (
            "Your account has been successfully created via Google. You are ready to go!"
          ) : (
            <>
              We've sent a verification link to{" "}
              <span className="font-semibold text-gray-800">{email}</span>.
            </>
          )}
        </p>

        {/* 3. INSTRUCTION BOX (Only for Email) */}
        {!isGoogle && (
          <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100 text-left flex gap-3">
            <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm h-fit">
              <Mail className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Next Step:
              </h4>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Click the link in the email to activate your account. Check your
                spam folder if it doesn't arrive within a few minutes.
              </p>
            </div>
          </div>
        )}

        {/* 4. ACTIONS */}
        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-all shadow-lg shadow-gray-200 active:scale-[0.98]">
            {isGoogle ? "Go to Dashboard" : "I've Verified My Email"}
            <ArrowRight size={18} />
          </Link>

          {!isGoogle && (
            <button className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Resend verification email
            </button>
          )}
        </div>
      </div>

      {/* 5. FOOTER TRUST BADGE */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
        <ShieldCheck size={14} className="text-green-600" />
        <span>Your data is secure and encrypted</span>
      </div>
    </div>
  );
};

export default StepSuccess;
